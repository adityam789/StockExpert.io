import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import crypto from "crypto";

let db = null;

const hashNode = (val) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(crypto.createHash("sha256").update(val).digest("hex")),
      0
    )
  );

// Initialize the a database
async function init() {
  try {
    PouchDB.plugin(PouchdbFind);
    db = new PouchDB("users-credentials");
  } catch (err) {
    console.error(err);
  }
}

async function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

// TODO: Copilot suggested this function (I have no clue what the regex is doing)
async function validatePassword(password) {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
    return true;
  }
  return false;
}

export async function login(response, email, password) {
  try {
    if (db === null) {
      await init();
    }

    if (email === undefined || password === undefined) {
      console.log("email undefined");
      response.status(400).json({ error: "email or password is undefined" });
      return false;
    }

    if (ValidateEmail(email) === false) {
      console.log("email invalid");
      response.status(400).json({ error: "email is invalid" });
      return false;
    }

    var result = await db.find({
      selector: { email: email, password: hashNode(password) },
    });

    if (result.docs.length === 0) {
      response.status(400).json({ error: "email or password incorrect" });
      console.log("email or password incorrect");
      return false;
    }

    response.status(200).json({ message: "login successful" });
    return result.docs.length !== 0;
  } catch (err) {
    console.log(err);
  }
}

export async function forgotPassword(response, email, newPassword) {
  try {
    if (db === null) {
      await init();
    }

    if (email === undefined || newPassword === undefined) {
      console.log("email or new password is undefined");
      response
        .status(400)
        .json({ error: "email or new password is undefined" });
      return false;
    }

    if (ValidateEmail(email) === false) {
      console.log("email invalid");
      response.status(400).json({ error: "email is invalid" });
      return false;
    }

    if (validatePassword(newPassword) === false) {
      console.log("new password invalid");
      response.status(400).json({ error: "new password is invalid" });
      return false;
    }

    db.find({
      selector: { email: email },
    })
      .then(function (result) {
        // handle result
        if (result.docs.length === 0) {
          response.status(400).json({ error: "email does not exist" });
          console.log("email does not exist");
          return false;
        }
        db.get(result.docs[0]._id)
          .then(function (doc) {
            return db.put({
              _id: result.docs[0]._id,
              _rev: doc._rev,
              name: result.docs[0].name,
              email: email,
              password: hashNode(newPassword),
            });
          })
          .then(function (result) {
            // handle response
            response
              .status(200)
              .json({ message: "password changed successfully" });
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
}
