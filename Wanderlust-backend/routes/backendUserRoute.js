import express from "express";
import * as admin from "../modules/adminAccessible.js";

export const app = express();

app.post("/add/:user", admin.addNewUser);
app.post("/update/:user", admin.updateDetails);
app.delete("/delete/:user/:id", admin.deleteUser);
