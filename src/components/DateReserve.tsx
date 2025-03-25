"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function LocalizationProvider({onHotelChange, onNameChange, onNumberChange, onDateChange} : {onHotelChange:Function, onNameChange:Function, onNumberChange:Function, onDateChange:Function}) {

  const [hotel, setHotel] = useState("")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [date, setDate] = useState<Dayjs|null>(null)

  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value)
    setName(e.target.value)
  }

  const handleNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onNumberChange(e.target.value)
    setNumber(e.target.value)
  }

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-col">
      <label htmlFor="Name-Lastname">Name-Lastname</label>
      <TextField name="Name-Lastname" id="Name-Lastname" variant="standard" value={name} onChange={handleNameChange}></TextField>
      <label htmlFor="Contact-Number">Contact-Number</label>
      <TextField name="Contact-Number" id="Contact-Number" variant="standard" value={number} onChange={handleNumberChange}></TextField>
      <label htmlFor="hotel">Select Hotel</label>
      <Select
          variant="standard"
          name="hotel"
          id="hotel"
          className="h-[2em] w-[200px]"
          value={hotel}
          onChange={(e)=>{setHotel(e.target.value); onHotelChange(e.target.value)}}
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      <div className="flex flex-row justify-center space-x-5">
        <MUILocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker className="bg-white" value={date} onChange={(value)=>{setDate(value); onDateChange(value)}}/>
        </MUILocalizationProvider>
      </div>
    </div>
  );
}
