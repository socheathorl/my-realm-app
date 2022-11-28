import { getTasks } from "../../../database/schema";

export default async function handle(req, res) {
  const result = await getTasks();
  res.json(result);
}