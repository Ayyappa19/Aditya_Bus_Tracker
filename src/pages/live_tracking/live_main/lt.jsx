import React, { useState } from 'react'
import temp from "../../../assets/get_my_bus/temp.webp"
import bus from "../../../assets/get_my_bus/bus.png"
import { FaSearchLocation } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import LTMap from '../live_map/lt_map.jsx';
import './lt.css';

function LiveTracking() {

    const [activeGround, setActiveGround] = useState(null);

    const [inputValue, setinputValue] = useState('')

    const allBusesDetails = [
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'KKD',
            bus_image: bus,
        },

        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 456,
            bus_ground: 'KKD',
            bus_image: bus,
        },

    ]

    const kkdBusesDetails = [
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 123,
            bus_ground: 'KKD',
            bus_image: bus,
        },
    ]

    const rjyBusesDetails = [
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 231,
            bus_ground: 'RJY',
            bus_image: bus,
        },
    ]

    const ptpBusesDetails = [
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },
        {
            driver_photo: temp,
            driver_name: 'Neduri Rajeswar Yadav',
            bus_number: 312,
            bus_ground: 'PTP',
            bus_image: bus,
        },

    ]

    const [busList, setBusList] = useState(allBusesDetails)

    const changeBusList = (value) => {
        setActiveGround(value)
        var list = (value == 1 ? kkdBusesDetails : (value == 2 ? rjyBusesDetails : ptpBusesDetails))
        setBusList(list)
    }

    const Search = (e) => {
        const updatedBusesList = allBusesDetails.filter((item) => {
            return (item.bus_number == inputValue || item.driver_name.includes(inputValue.trim().toLowerCase()))
        })
        setBusList(updatedBusesList)
    }

    return (
        <div className='lt_main'>
            <div className="lt_main_map">
                <LTMap />
            </div>
            <div className="lt_cards">
                <div className="lt_search">
                    <div className="lt_inpbut">
                        <input onChange={(e) => setinputValue(e.target.value)} className='lt_input' type="text" name="Search" id="" placeholder='Enter Bus Details...' />
                        <div className="lt_but" onClick={(e) => Search(e)}><FaSearchLocation style={{ fontSize: '22px' }} /></div>
                    </div>
                    <div className="lt_refresh" onClick={() => window.location.reload()} ><IoMdRefresh style={{ fontSize: '32px' }} /></div>
                </div>
                <div className="lt_centerbar">
                    <div className="lt_ground_details">
                        <div className={`lt_ground ${activeGround === 1 ? 'active' : ''}`} onClick={() => changeBusList(1)}>
                            <FaCircle style={{ color: 'deepskyblue' }} />
                            KKD Ground
                        </div>
                        <div className={`lt_ground ${activeGround === 2 ? 'active' : ''}`} onClick={() => changeBusList(2)}>
                            <FaCircle style={{ color: 'red' }} />
                            RJY Ground
                        </div>
                        <div className={`lt_ground ${activeGround === 3 ? 'active' : ''}`} onClick={() => changeBusList(3)}>
                            <FaCircle style={{ color: 'darkblue' }} />
                            PTP Ground
                        </div>
                    </div>
                </div>
                <div className="lt_buslist">
                    {
                        busList.length !== 0 ? busList.map((item, index) => {
                            return (
                                <div className="lt_buscard" key={index}>
                                    <div className="lt_driver_pic">
                                        <img src={item.driver_photo} alt="" />
                                    </div>
                                    <div className="lt_driver_details">
                                        <div className='lt_bus_no'>Bus-no: {item.bus_number}</div>
                                        <div className='lt_driver_name'>{item.driver_name}</div>
                                        <div className='lt_ground_name'>
                                            <FaCircle style={{ color: item.bus_ground == 'KKD' ? 'deepskyblue' : (item.bus_ground == 'RJY' ? 'red' : 'darkblue') }} />
                                            {item.bus_ground} Ground
                                        </div>
                                    </div>
                                    <div className="lt_bus_but">
                                        <div className="lt_bus_status">
                                            <img src={bus} alt="" />
                                        </div>
                                        <div className="lt_get_directions">
                                            <div className="lt_get_directions_but" onClick={() => getDirections(item)}>
                                                Track Your Bus
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <h1>No Buses are Available!</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default LiveTracking