'use client'
import {DatePicker} from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import { TextField,Select,MenuItem } from "@mui/material"
import { Dayjs } from "dayjs"

export default function DateReserve(
    {onDateChange,onLocationChange,onNameChange,onTelChange}:
    {onDateChange:Function,onLocationChange:Function,onNameChange:Function,onTelChange:Function}){

    const [reserveDate,setReserveDate] = useState<Dayjs|null>(null);
    const [reserveLocation,setReserveLocation] = useState<string>("Bloom");
    const [reserveName,setReserveName] = useState<string|null>(null);
    const [tel,setTel] = useState<string|null>(null);
    return(
        <div  className="flex flex-col w-[600px] ">
            <TextField
                variant="standard"
                name="Name-Lastname"
                label="Name-Lastname"
                value={reserveName}
                onChange={(e)=>{setReserveName(e.target.value);onNameChange(e.target.value)}}
                className="w-[200px] h-[60px] mt-0 ml-[10px]"
            />
            <TextField
                variant="standard"
                name="Contact-Number"
                label="Contact-Number"
                value={tel}
                onChange={(e)=>{setTel(e.target.value);onTelChange(e.target.value)}}
                className="w-[200px] h-[60px] ml-[10px]"
            />
            <Select
                variant="standard"
                id="venue"
                value={reserveLocation}
                className="h-[2em] w-[200px] ml-[10px] mb-[20px] mt-[7px]"
                onChange={(e)=>{setReserveLocation(e.target.value);onLocationChange(e.target.value)}}
            >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
            <div className="flex flex-col ml-[3px] p-0 pt-[10px]  pb-[10px] w-[600px] rounded-lg">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        className="bg-white rounded-md w-[300px]"
                        value={reserveDate}
                        onChange={(value)=>{setReserveDate(value);onDateChange(value)}}
                        />
                </LocalizationProvider>
            </div>
        </div>
    )
}