export interface PopulationCategory {
    name: string;
    shortName: string;
}

export const getPopulationCategory = (population: number): PopulationCategory => {
    if (population > 4_000_000) return { name: '4 Million+', shortName: '4M+' };
    if (population > 1_000_000) return { name: '1 Million to 4 Million', shortName: '1M-4M' };
    if (population > 100_000) return { name: '100 Thousands to 1 Million', shortName: '100K-1M' };
    else return { name: '<100 Thousands', shortName: '<100K' };
}