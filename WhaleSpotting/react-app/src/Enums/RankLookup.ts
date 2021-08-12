export enum Rank {
    Newbie = 1,
    Intermediate,
    Advanced,
    Master
}

export const reportSightingsRank = {
    [Rank.Newbie]: "Newbie.jpg",
    [Rank.Intermediate]: "Intermediate.jpg",
    [Rank.Advanced]: "Advanced.jpg",
    [Rank.Master]: "Master.jpg"
};