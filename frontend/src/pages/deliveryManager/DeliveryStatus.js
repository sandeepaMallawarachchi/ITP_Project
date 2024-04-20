import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function DeliveryStatus() {
    return (
        <div>

    <Timeline>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>February 2022</Timeline.Time>
          <Timeline.Title>Delivered</Timeline.Title>    
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>March 2022</Timeline.Time>
          <Timeline.Title>Out for delivery</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  
        </div>
    );
}
