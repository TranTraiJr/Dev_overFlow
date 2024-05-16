"use server";

import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";
import { connectToDB } from "../mongoose";
import { ViewQuestionParams } from "./share.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDB();

    const { questionId, userId } = params;

    // Update view count for question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      // Create new interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
