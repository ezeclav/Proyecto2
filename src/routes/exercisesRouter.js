import express from "express";

const router = express.Router();

import authUserController from "../middlewares/authUserController.js";

import {
  exerciseExistsController,
  userExistsController,
  cantEditController,
} from "../middlewares/index.js";

import //   newEntryController,
//   listEntriesController,
//   getEntryController,
//   voteEntryController,
//   addEntryPhotoController,
"../controllers/exercises/index.js";

router.post(
  "/entries",
  authUserController
  //   userExistsController,
  //   newEntryController
);
router.get("/entries", listEntriesController);
router.get("/entries/:entryId", exerciseExistsController, getEntryController);

router.post(
  "/entries/:entryId/votes",
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController
);

router.post(
  "/entries/:entryId/photos",
  authUserController,
  userExistsController,
  entryExistsController,
  cantEditController,
  addEntryPhotoController
);

export default router;
