import { TeamBoardDetails } from "../lib/interfaces";

export const teams = new Map<string, TeamBoardDetails>([
  [
    "ARI",
    {
      location: "Arizona",
      name: "Cardinals",
      abbreviation: "ARI",
      banner: {
        bgColor: "bg-ARI-100",
        numbersBgColor: "bg-ARI-200",
        homeBgImage: "bg-[url('/logos/home/ARI.png')]",
        awayBgImage: "bg-[url('/logos/away/ARI.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-ARI-100 to-50%",
        awayBgGradient: "from-ARI-100 from-50%",
      }
    },
  ],
  [
    "ATL",
    {
      location: "Atlanta",
      name: "Falcons",
      abbreviation: "ATL",
      banner: {
        bgColor: "bg-ATL-100",
        numbersBgColor: "bg-ATL-200",
        homeBgImage: "bg-[url('/logos/home/ATL.png')]",
        awayBgImage: "bg-[url('/logos/away/ATL.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-11rem]",
        awayBgStyle: "bg-cover bg-[right_-11rem_center]",
        homeBgGradient: "to-ATL-100 to-50%",
        awayBgGradient: "from-ATL-100 from-50%",
      }
    },
  ],
  [
    "BAL",
    {
      location: "Baltimore",
      name: "Ravens",
      abbreviation: "BAL",
      banner: {
        bgColor: "bg-BAL-200",
        numbersBgColor: "bg-BAL-100",
        homeBgImage: "bg-[url('/logos/home/BAL.png')]",
        awayBgImage: "bg-[url('/logos/away/BAL.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-BAL-200 to-50%",
        awayBgGradient: "from-BAL-200 from-50%",
      }
    },
  ],
  [
    "BUF",
    {
      location: "Buffalo",
      name: "Bills",
      abbreviation: "BUF",
      banner: {
        bgColor: "bg-BUF-100",
        numbersBgColor: "bg-BUF-200",
        homeBgImage: "bg-[url('/logos/home/BUF.png')]",
        awayBgImage: "bg-[url('/logos/away/BUF.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-BUF-100 to-50%",
        awayBgGradient: "from-BUF-100 from-50%",
      }
    },
  ],
  [
    "CAR",
    {
      location: "Carolina",
      name: "Panthers",
      abbreviation: "CAR",
      banner: {
        bgColor: "bg-CAR-200",
        numbersBgColor: "bg-CAR-100",
        homeBgImage: "bg-[url('/logos/home/CAR.png')]",
        awayBgImage: "bg-[url('/logos/away/CAR.png')]",
        homeBgStyle: "bg-cover bg-[right_3rem_bottom_-12rem]",
        awayBgStyle: "bg-cover bg-[right_-12rem_bottom_-3rem]",
        homeBgGradient: "to-CAR-200 to-50%",
        awayBgGradient: "from-CAR-200 from-50%",
      }
    },
  ],
  [
    "CHI",
    {
      location: "Chicago",
      name: "Bears",
      abbreviation: "CHI",
      banner: {
        bgColor: "bg-CHI-100",
        numbersBgColor: "bg-CHI-200",
        homeBgImage: "bg-[url('/logos/home/CHI.png')]",
        awayBgImage: "bg-[url('/logos/away/CHI.png')]",
        homeBgStyle: "bg-cover bg-[center_top_-4rem]",
        awayBgStyle: "bg-cover bg-[left_-4rem_center]",
        homeBgGradient: "to-CHI-100 to-50%",
        awayBgGradient: "from-CHI-100 from-50%",
      }
    },
  ],
  [
    "CIN",
    {
      location: "Cincinnati",
      name: "Bengals",
      abbreviation: "CIN",
      banner: {
        bgColor: "bg-CIN-100",
        numbersBgColor: "bg-CIN-200",
        homeBgImage: "bg-[url('/logos/home/CIN.png')]",
        awayBgImage: "bg-[url('/logos/away/CIN.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-CIN-100 to-50%",
        awayBgGradient: "from-CIN-100 from-50%",
      }
    },
  ],
  [
    "CLE",
    {
      location: "Cleveland",
      name: "Browns",
      abbreviation: "CLE",
      banner: {
        bgColor: "bg-CLE-100",
        numbersBgColor: "bg-CLE-200",
        homeBgImage: "bg-[url('/logos/home/CLE.png')]",
        awayBgImage: "bg-[url('/logos/away/CLE.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-CLE-100 to-50%",
        awayBgGradient: "from-CLE-100 from-50%",
      }
    },
  ],
  [
    "DAL",
    {
      location: "Dallas",
      name: "Cowboys",
      abbreviation: "DAL",
      banner: {
        bgColor: "bg-DAL-200",
        numbersBgColor: "bg-DAL-100",
        homeBgImage: "bg-[url('/logos/home/DAL.png')]",
        awayBgImage: "bg-[url('/logos/away/DAL.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-DAL-200 to-50%",
        awayBgGradient: "from-DAL-200 from-50%",
      }
    },
  ],
  [
    "DEN",
    {
      location: "Denver",
      name: "Broncos",
      abbreviation: "DEN",
      banner: {
        bgColor: "bg-DEN-100",
        numbersBgColor: "bg-DEN-200",
        homeBgImage: "bg-[url('/logos/home/DEN.png')]",
        awayBgImage: "bg-[url('/logos/away/DEN.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-DEN-100 to-50%",
        awayBgGradient: "from-DEN-100 from-50%",
      }
    },
  ],
  [
    "DET",
    {
      location: "Detroit",
      name: "Lions",
      abbreviation: "DET",
      banner: {
        bgColor: "bg-DET-100",
        numbersBgColor: "bg-DET-200",
        homeBgImage: "bg-[url('/logos/home/DET.png')]",
        awayBgImage: "bg-[url('/logos/away/DET.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-12rem]",
        awayBgStyle: "bg-cover bg-[right_-12rem_center]",
        homeBgGradient: "to-DET-100 to-50%",
        awayBgGradient: "from-DET-100 from-50%",
      }
    },
  ],
  [
    "GB",
    {
      location: "Green Bay",
      name: "Packers",
      abbreviation: "GB",
      banner: {
        bgColor: "bg-GB-100",
        numbersBgColor: "bg-GB-200",
        homeBgImage: "bg-[url('/logos/home/GB.png')]",
        awayBgImage: "bg-[url('/logos/away/GB.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-GB-100 to-50%",
        awayBgGradient: "from-GB-100 from-50%",
      }
    },
  ],
  [
    "HOU",
    {
      location: "Houston",
      name: "Texans",
      abbreviation: "HOU",
      banner: {
        bgColor: "bg-HOU-100",
        numbersBgColor: "bg-HOU-200",
        homeBgImage: "bg-[url('/logos/home/HOU.png')]",
        awayBgImage: "bg-[url('/logos/away/HOU.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-12rem]",
        awayBgStyle: "bg-cover bg-[right_-12rem_center]",
        homeBgGradient: "to-HOU-200 to-50%",
        awayBgGradient: "from-HOU-200 from-50%",
      }
    },
  ],
  [
    "IND",
    {
      location: "Indianapolis",
      name: "Colts",
      abbreviation: "IND",
      banner: {
        bgColor: "bg-IND-100",
        numbersBgColor: "bg-IND-200",
        homeBgImage: "bg-[url('/logos/home/IND.png')]",
        awayBgImage: "bg-[url('/logos/away/IND.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-8rem]",
        awayBgStyle: "bg-cover bg-[right_-8rem_center]",
        homeBgGradient: "to-IND-100 to-50%",
        awayBgGradient: "from-IND-100 from-50%",
      }
    },
  ],
  [
    "JAC",
    {
      location: "Jacksonville",
      name: "Jaguars",
      abbreviation: "JAC",
      banner: {
        bgColor: "bg-JAC-400",
        numbersBgColor: "bg-JAC-300",
        homeBgImage: "bg-[url('/logos/home/JAC.png')]",
        awayBgImage: "bg-[url('/logos/away/JAC.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-13rem]",
        awayBgStyle: "bg-cover bg-[right_-13rem_center]",
        homeBgGradient: "to-JAC-400 to-50%",
        awayBgGradient: "from-JAC-400 from-50%",
      }
    },
  ],
  [
    "KC",
    {
      location: "Kansas City",
      name: "Chiefs",
      abbreviation: "KC",
      banner: {
        bgColor: "bg-KC-100",
        numbersBgColor: "bg-KC-200",
        homeBgImage: "bg-[url('/logos/home/KC.png')]",
        awayBgImage: "bg-[url('/logos/away/KC.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-KC-100 to-50%",
        awayBgGradient: "from-KC-100 from-50%",
      }
    },
  ],
  [
    "LV",
    {
      location: "Las Vegas",
      name: "Raiders",
      abbreviation: "LV",
      banner: {
        bgColor: "bg-LV-200",
        numbersBgColor: "bg-LV-100",
        homeBgImage: "bg-[url('/logos/home/LV.png')]",
        awayBgImage: "bg-[url('/logos/away/LV.png')]",
        homeBgStyle: "bg-cover bg-[center_top_-9rem]",
        awayBgStyle: "bg-cover bg-[left_-9rem_center]",
        homeBgGradient: "to-LV-200 to-50%",
        awayBgGradient: "from-LV-200 from-50%",
      }
    },
  ],
  [
    "LAC",
    {
      location: "Los Angeles",
      name: "Chargers",
      abbreviation: "LAC",
      banner: {
        bgColor: "bg-LAC-100",
        numbersBgColor: "bg-LAC-200",
        homeBgImage: "bg-[url('/logos/home/LAC.png')]",
        awayBgImage: "bg-[url('/logos/away/LAC.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-LAC-100 to-50%",
        awayBgGradient: "from-LAC-100 from-50%",
      }
    },
  ],
  [
    "LAR",
    {
      location: "Los Angeles",
      name: "Rams",
      abbreviation: "LAR",
      banner: {
        bgColor: "bg-LAR-100",
        numbersBgColor: "bg-LAR-200",
        homeBgImage: "bg-[url('/logos/home/LAR.png')]",
        awayBgImage: "bg-[url('/logos/away/LAR.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-LAR-100 to-50%",
        awayBgGradient: "from-LAR-100 from-50%",
      }
    },
  ],
  [
    "MIA",
    {
      location: "Miami",
      name: "Dolphins",
      abbreviation: "MIA",
      banner: {
        bgColor: "bg-MIA-100",
        numbersBgColor: "bg-MIA-200",
        homeBgImage: "bg-[url('/logos/home/MIA.png')]",
        awayBgImage: "bg-[url('/logos/away/MIA.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-9rem]",
        awayBgStyle: "bg-cover bg-[right_-9rem_center]",
        homeBgGradient: "to-MIA-100 to-50%",
        awayBgGradient: "from-MIA-100 from-50%",
      }
    },
  ],
  [
    "MIN",
    {
      location: "Minnesota",
      name: "Vikings",
      abbreviation: "MIN",
      banner: {
        bgColor: "bg-MIN-100",
        numbersBgColor: "bg-MIN-200",
        homeBgImage: "bg-[url('/logos/home/MIN.png')]",
        awayBgImage: "bg-[url('/logos/away/MIN.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-MIN-100 to-50%",
        awayBgGradient: "from-MIN-100 from-50%",
      }
    },
  ],
  [
    "NE",
    {
      location: "New England",
      name: "Patriots",
      abbreviation: "NE",
      banner: {
        bgColor: "bg-NE-100",
        numbersBgColor: "bg-NE-200",
        homeBgImage: "bg-[url('/logos/home/NE.png')]",
        awayBgImage: "bg-[url('/logos/away/NE.png')]",
        homeBgStyle: "bg-cover bg-[center_bottom_-7rem]",
        awayBgStyle: "bg-cover bg-[right_-7rem_center]",
        homeBgGradient: "to-NE-100 to-50%",
        awayBgGradient: "from-NE-100 from-50%",
      }
    },
  ],
  [
    "NO",
    {
      location: "New Orleans",
      name: "Saints",
      abbreviation: "NO",
      banner: {
        bgColor: "bg-NO-100",
        numbersBgColor: "bg-NO-200",
        homeBgImage: "bg-[url('/logos/home/NO.png')]",
        awayBgImage: "bg-[url('/logos/away/NO.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-NO-100 to-50%",
        awayBgGradient: "from-NO-100 from-50%",
      }
    },
  ],
  [
    "NYG",
    {
      location: "New York",
      name: "Giants",
      abbreviation: "NYG",
      banner: {
        bgColor: "bg-NYG-100",
        numbersBgColor: "bg-NYG-200",
        homeBgImage: "bg-[url('/logos/home/NYG.png')]",
        awayBgImage: "bg-[url('/logos/away/NYG.png')]",
        homeBgStyle: "bg-cover bg-[center_top_-9.5rem]",
        awayBgStyle: "bg-cover bg-[left_-9.5rem_center]",
        homeBgGradient: "to-NYG-100 to-50%",
        awayBgGradient: "from-NYG-100 from-50%",
      }
    },
  ],
  [
    "NYJ",
    {
      location: "New York",
      name: "Jets",
      abbreviation: "NYJ",
      banner: {
        bgColor: "bg-NYJ-100",
        numbersBgColor: "bg-NYJ-200",
        homeBgImage: "bg-[url('/logos/home/NYJ.png')]",
        awayBgImage: "bg-[url('/logos/away/NYJ.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-NYJ-100 to-50%",
        awayBgGradient: "from-NYJ-100 from-50%",
      }
    },
  ],
  [
    "PHI",
    {
      location: "Philadelphia",
      name: "Eagles",
      abbreviation: "PHI",
      banner: {
        bgColor: "bg-PHI-100",
        numbersBgColor: "bg-PHI-200",
        homeBgImage: "bg-[url('/logos/home/PHI.png')]",
        awayBgImage: "bg-[url('/logos/away/PHI.png')]",
        homeBgStyle: "bg-cover bg-[right_-3rem_bottom_-3rem]",
        awayBgStyle: "bg-cover bg-[right_-3rem_bottom_3rem]",
        homeBgGradient: "to-PHI-100 to-50%",
        awayBgGradient: "from-PHI-100 from-50%",
      }
    },
  ],
  [
    "PIT",
    {
      location: "Pittsburgh",
      name: "Steelers",
      abbreviation: "PIT",
      banner: {
        bgColor: "bg-PIT-100",
        numbersBgColor: "bg-PIT-200",
        homeBgImage: "bg-[url('/logos/home/PIT.png')]",
        awayBgImage: "bg-[url('/logos/away/PIT.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-PIT-100 to-50%",
        awayBgGradient: "from-PIT-100 from-50%",
      }
    },
  ],
  [
    "SF",
    {
      location: "San Francisco",
      name: "49ers",
      abbreviation: "SF",
      banner: {
        bgColor: "bg-SF-100",
        numbersBgColor: "bg-SF-200",
        homeBgImage: "bg-[url('/logos/home/SF.png')]",
        awayBgImage: "bg-[url('/logos/away/SF.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-SF-100 to-50%",
        awayBgGradient: "from-SF-100 from-50%",
      }
    },
  ],
  [
    "SEA",
    {
      location: "Seattle",
      name: "Seahawks",
      abbreviation: "SEA",
      banner: {
        bgColor: "bg-SEA-100",
        numbersBgColor: "bg-SEA-200",
        homeBgImage: "bg-[url('/logos/home/SEA.png')]",
        awayBgImage: "bg-[url('/logos/away/SEA.png')]",
        homeBgStyle: "bg-cover bg-center",
        awayBgStyle: "bg-cover bg-center",
        homeBgGradient: "to-SEA-100 to-50%",
        awayBgGradient: "from-SEA-100 from-50%",
      }
    },
  ],
  [
    "TB",
    {
      location: "Tampa Bay",
      name: "Buccaneers",
      abbreviation: "TB",
      banner: {
        bgColor: "bg-TB-500",
        numbersBgColor: "bg-TB-200",
        homeBgImage: "bg-[url('/logos/home/TB.png')]",
        awayBgImage: "bg-[url('/logos/away/TB.png')]",
        homeBgStyle: "bg-cover bg-[center_top_-6rem]",
        awayBgStyle: "bg-cover bg-[left_-6rem_center]",
        homeBgGradient: "to-TB-500 to-50%",
        awayBgGradient: "from-TB-500 from-50%",
      }
    },
  ],
  [
    "TEN",
    {
      location: "Tennessee",
      name: "Titans",
      abbreviation: "TEN",
      banner: {
        bgColor: "bg-TEN-100",
        numbersBgColor: "bg-TEN-300",
        homeBgImage: "bg-[url('/logos/home/TEN.png')]",
        awayBgImage: "bg-[url('/logos/away/TEN.png')]",
        homeBgStyle: "bg-cover bg-[left_-3.5rem_bottom_-6rem]",
        awayBgStyle: "bg-cover bg-[left_-11rem_bottom_-3.5rem]",
        homeBgGradient: "to-TEN-100 to-50%",
        awayBgGradient: "from-TEN-100 from-50%",
      }
    },
  ],
  [
    "WAS",
    {
      location: "Washington",
      name: "Commanders",
      abbreviation: "WAS",
      banner: {
        bgColor: "bg-WAS-100",
        numbersBgColor: "bg-WAS-100",
        homeBgImage: "bg-[url('/logos/home/WAS.png')]",
        awayBgImage: "bg-[url('/logos/away/WAS.png')]",
        homeBgStyle: "bg-cover bg-[center_top_-6rem]",
        awayBgStyle: "bg-cover bg-[left_-6rem_center]",
        homeBgGradient: "to-WAS-100 to-50%",
        awayBgGradient: "from-WAS-100 from-50%",
      }
    },
  ],
]);
