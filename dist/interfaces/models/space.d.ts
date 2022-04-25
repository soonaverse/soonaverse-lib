import { BaseRecord, BaseSubCollection, Timestamp } from './base';
export interface SpaceGuardian extends BaseSubCollection {
    uid: string;
    createdOn: Timestamp;
}
export interface Alliance extends BaseRecord {
    weight: number;
    enabled: boolean;
    established: boolean;
}
export interface SpaceMember extends BaseSubCollection {
    uid: string;
    createdOn: Timestamp;
}
export interface Space extends BaseRecord {
    name?: string;
    about?: string;
    open?: boolean;
    github?: string;
    twitter?: string;
    discord?: string;
    avatarUrl?: string;
    bannerUrl?: string;
    createdBy: string;
    totalGuardians: number;
    totalMembers: number;
    totalPendingMembers: number;
    validatedAddress?: string;
    alliances: {
        [propName: string]: Alliance;
    };
    guardians: {
        [propName: string]: SpaceGuardian;
    };
    members: {
        [propName: string]: SpaceMember;
    };
}
