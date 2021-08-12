export enum Rank {
    Newbie = 1,
    Intermediate,
    Advanced,
    Master
}

export const reportSightingsRank = {
    [Rank.Newbie]: "../../public/Newbie.png",
    [Rank.Intermediate]: "../../public/Intermediate.png",
    [Rank.Advanced]: "../../public/Advanced.png",
    [Rank.Master]: "../../public/Master.png"
};