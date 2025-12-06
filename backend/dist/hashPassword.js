"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function run() {
    const password = "123456";
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(password, salt);
    console.log("Hashed:", hash);
}
run();
