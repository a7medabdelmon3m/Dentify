import { notFound } from "next/navigation";

export default function CatchAllNotFound() {
  // الدالة دي بتجبر السيستم يروح لملف الـ not-found.tsx بتاعك علطول
  notFound();
}