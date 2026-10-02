export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Initiative {
  id: string;
  no: number;
  komponen: SmartCityComponent;
  kodInisiatif: string;
  fastTrack: boolean;
  inisiatif: string;
  outcome: string | null;
  agensiUtama: string | null;
  agensiSokongan: string | null;
  fasaPelaksanaan: string | null;
  indikatorMSISO37122: string | number | null;
  tahapPenarafanBandarPintarMalaysia: string | null;
  statusPelaksanaan: string | null;
  bajetUSPFundRM: string | null;
  catatan: string | null;
  lokasiKoordinatAsal: string | null;
  koordinat: Coordinate[];
}

export type SmartCityComponent =
  | 'Smart Government'
  | 'Smart Economy'
  | 'Smart Environment'
  | 'Smart Mobility'
  | 'Smart People'
  | 'Smart Digital Infrastruktur'
  | 'Smart Living';

export interface MasterDataMetadata {
  tajuk: string;
  tagline: string;
  sumberFail: string;
  sheetSumber: string;
  tarikhPenukaran: string;
  jumlahInisiatif: number;
  jumlahKomponen: number;
  jumlahFastTrack: number;
  jumlahInisiatifDenganKoordinat: number;
  jumlahTitikKoordinat: number;
  jumlahTitikKoordinatUnik: number;
  notaData: string[];
  bilanganMengikutKomponen: Record<string, number>;
}

export interface MasterData {
  metadata: MasterDataMetadata;
  inisiatif: Initiative[];
}

export interface ComponentConfig {
  name: SmartCityComponent;
  slug: string;
  color: string;
  bgPastel: string;
  borderPastel: string;
  textPastel: string;
  iconName: string;
  count: number;
  deskripsi: string;
}
