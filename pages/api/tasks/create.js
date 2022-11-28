import { insertNewTask } from "../../../database/schema";

export default async function handle(req, res) {
  const { id, name, status } = req.body;
  if (req.method == "POST") {
    const result = await insertNewTask(id, name, status);
    res.status(200).json(result);
  } else {
    res.status(500).json({error: "Mehtod not allow"})
  }
}