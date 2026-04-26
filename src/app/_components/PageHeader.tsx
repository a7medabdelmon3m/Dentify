import React from "react";
export type prop = {
    title:string;
    desc:string;
}
export default function PageHeader({title ,desc}:prop) {
  return (
    <div>
      <h2 className="font-bold font-heading text-text-title text-2xl">
        {title}
      </h2>
      <p className="text-text-body font-medium text-sm">{desc}</p>
      <hr className="border border-gray-200 my-6" />
    </div>
  );
}
