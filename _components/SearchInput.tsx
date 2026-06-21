"use client";
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl';
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchInput() {
  const t = useTranslations("SearchInput");

  return (
    <div className="relative w-full lg:w-[40%] ">
      <FaSearch
        color="#4D44B5"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      />
      <Input
        className=" ps-12 pe-4 py-3 h-auto rounded-[40px] bg-white placeholder:text-lg placeholder:font-semibold  border-0 focus:outline-none focus-visible:ring-2 focus-visible:border focus-visible:border-primary  focus-visible:ring-primary/20  "
        placeholder={t("placeholder")}
      ></Input>
    </div>
  )
}