var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./user.model.ts";
import setError from "../../helpers/error/handle.error.js";
export var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, userExists, newUserInDB, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newUser = new User(req.body);
                return [4 /*yield*/, User.findOne({ username: newUser.username })];
            case 1:
                userExists = _a.sent();
                if (userExists)
                    return [2 /*return*/, next("The username is already taken")];
                return [4 /*yield*/, newUser.save()];
            case 2:
                newUserInDB = _a.sent();
                return [2 /*return*/, res.json({
                        status: 201,
                        message: "New user registered",
                        data: newUserInDB,
                    })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, next(setError(500, "User register failed"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInDB, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                userInDB = _a.sent();
                if (!userInDB)
                    return [2 /*return*/, next("The username doesn't exist")];
                if (bcrypt.compareSync(req.body.password, userInDB.password)) {
                    userInDB.password = null; // userInDB is a copy from the DB and we remove that password copy from our code
                    token = jwt.sign({
                        id: userInDB._id,
                        username: userInDB.username,
                    }, req.app.get("secretKey"), // req.app is a default property, it's not defined in the index.js with express()
                    {
                        expiresIn: "1h",
                    });
                    console.log(token);
                    return [2 /*return*/, res.json({
                            status: 200,
                            message: "Welcome user",
                            user: userInDB,
                            token: token,
                        })];
                }
                else {
                    return [2 /*return*/, next("The password is incorrect")];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, next(setError(500, "User login failed"))];
            case 3: return [2 /*return*/];
        }
    });
}); };
