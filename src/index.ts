import  express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db";

dotenv.config()

dbConnect()