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
  category: string;
  imageURL: string;
  placeName: string;
  location: Location;
  meetingTime: string;
  dayOfWeek: number;
  ageRange: [number, number];
  hostID: string;
  status: MeetingStatus;
  participantIDs: string[];
  maxParticipants: number;
  likeCount: number;
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
