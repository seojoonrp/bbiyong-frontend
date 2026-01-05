// src/types/meetingType.ts

import { Location } from "./commonType";

export enum MeetingStatus {
  Recruiting = "RECRUITING",
  Full = "FULL",
  Completed = "COMPLETED",
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  placeName: string;
  location: Location;
  hostID: string;
  hostNickname: string;
  participantIDs: string[];
  maxParticipants: number;
  ageRange: [number, number];
  meetingTime: string;
  dayOfWeek: number;
  status: MeetingStatus;
  createdAt: string;
}

export interface CreateMeetingRequest {
  title: string;
  description: string;
  placeName: string;
  location: Location;
  maxParticipants: number;
  ageRange: [number, number];
  meetingTime: string;
}
