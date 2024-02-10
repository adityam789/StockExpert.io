import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import crypto from "crypto";
import tempData from "../src/client/resources/mock_data/user_cred_mock_data.json" assert { type: "json" };

let db = null;

const hashNode = (val) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(crypto.createHash("sha256").update(val).digest("hex")),
      0
    )
  );

// Initialize the a database
export async function init() {
  try {
    PouchDB.plugin(PouchdbFind);
    db = new PouchDB("users-credentials");
  } catch (err) {
    console.log(err);
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

export async function register(response, name, email, password) {

    try{
        if (db === null) {
            await init();
        }

        if (email === undefined || password === undefined) {
            console.log("email undefined");
            response.status(400).json({ error: "email or password is undefined"});
            return false;
        }

        if (ValidateEmail(email) === false) {
            console.log("email invalid");
            response.status(400).json({ error: "email is invalid" });
            return false;
        }

        if (validatePassword(password) === false) {
            console.log("password invalid");
            response.status(400).json({ error: "password is invalid" });
            return false;
        }

        var result = await db.find({
            selector: { email: email },
        });

        if (result.docs.length !== 0) {
            response.status(400).json({ error: "email already exists" });
            console.log("email already exists");
            return false;
        }

        await db.post({
            name: name,
            email: email,
            password: await hashNode(password),
        });

        response.status(200).json({ message: "register is successful" });
        return true;

    } catch (err) {
        console.error(err);
    }

}
