const { Console } = require("console")
const crypto=require("crypto")

const secret=crypto.randomBytes(32).toString("hex")
console.log(secret)//9680915e37738c89d7884094b8108b9095cb35c77bcf12636e75ea98ff9e2195
