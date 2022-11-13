import { Router } from "express";
import controllers from "./coffeeshop.controllers.js";

export const messageHandler = (action, payload) => {
  console.log(action, payload);
};
