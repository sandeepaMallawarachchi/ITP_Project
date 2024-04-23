import React from 'react';
import { Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function DeliveryStatus() {
    return (
        <div>
            <h1 className='text-2xl mb-10'>Delivery Status</h1>
            
            <Timeline className="w-100">
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} className="w-10 h-10" />
                    <Timeline.Content>
                        <Timeline.Time>February 2022</Timeline.Time>
                        <Timeline.Title>Delivered</Timeline.Title>    
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} className="w-10 h-10" />
                    <Timeline.Content>
                        <Timeline.Time>March 2022</Timeline.Time>
                        <Timeline.Title>Out for delivery</Timeline.Title>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        </div>
    );
}
