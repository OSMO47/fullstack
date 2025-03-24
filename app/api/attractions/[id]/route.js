import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, context) {
  const { params } = context; // ✅ ใช้ context แทน
  const id = params.id;

  const promisePool = mysqlPool.promise();
  const [rows] = await promisePool.query(
    "SELECT * FROM attractions WHERE id = ?",
    [id]
  );

  return NextResponse.json(rows.length ? rows[0] : { error: "Not found" }, {
    status: rows.length ? 200 : 404,
  });
}
