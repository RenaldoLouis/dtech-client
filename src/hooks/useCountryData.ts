import React, { useState, useEffect, useCallback, useMemo } from "react";

interface BaseCountryData {
  currency: string[];
  callingCode: string[];
  region: string;
  subregion: string;
  flag: string;
  name: Record<string, string>;
}

export interface CountryData extends BaseCountryData {
  code: string;
}

export type PhoneCodeDetails = string;
// export interface PhoneCodeDetails {
// code: string;
// flag: string;
// callingCode: string;
// }

export const useCountriesData = (): [CountryData[], boolean] => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountriesData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://xcarpentier.github.io/react-native-country-picker-modal/countries/"
      );

      if (response.status >= 200 && response.status < 400) {
        const apiData: Record<string, BaseCountryData> =
          (await response.json()) ?? {};
        const countryList = Object.entries(apiData).map(
          ([countryCode, data]: [string, BaseCountryData]) => ({
            code: countryCode,
            ...data,
          })
        );
        setCountriesData(countryList ?? []);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCountriesData();
  }, [fetchCountriesData]);

  return [countriesData, isLoading];
};

export const usePhoneCodeData = (): [PhoneCodeDetails[], boolean] => {
  const [countryData, loading] = useCountriesData();

  const phoneCodes: PhoneCodeDetails[] = useMemo(
    () =>
      countryData
        .map(
          (country: CountryData) =>
            country.callingCode.map((callCode: string) => `+${callCode.trim()}`)
          // country.callingCode.map((callCode: string) => ({
          // code: country.code,
          // flag: country.flag,
          // callingCode: `+${callCode.trim()}`,
          // }))
        )
        .flat(5)
        .filter((val, idx, arr) => arr.indexOf(val) === idx),
    [countryData]
  );

  return [phoneCodes, loading];
};

export const useCurrencyData = (): [string[], boolean] => {
  const [countryData, loading] = useCountriesData();

  const currencies: string[] = useMemo(
    () =>
      countryData
        .map((country: CountryData) => country.currency)
        .flat()
        .filter((val, idx, arr) => arr.indexOf(val) === idx),
    [countryData]
  );

  return [currencies, loading];
};
