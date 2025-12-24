/**
 * @param jumlahHari
 * @param tarif 
 * @returns 
 */
export const calculateKotor = (jumlahHari: number, tarif: number): number => {
  return jumlahHari * tarif;
};

/**
 * @param kotor 
 * @param pph 
 * @returns 
 */
export const calculatePotongan = (kotor: number, pph: number): number => {
  return kotor * (pph / 100);
};

/**
 * @param kotor
 * @param potongan
 * @returns
 */
export const calculateBersih = (kotor: number, potongan: number): number => {
  return kotor - potongan;
};

/**
 * @param data
 * @returns
 */
export const autoCalculate = (data: {
  jumlahHari: number;
  tarif: number;
  pph: number;
}): { kotor: number; potongan: number; bersih: number } => {
  const kotor = calculateKotor(data.jumlahHari, data.tarif);
  const potongan = calculatePotongan(kotor, data.pph);
  const bersih = calculateBersih(kotor, potongan);

  return { kotor, potongan, bersih };
};

export const calculateStats = (data: any[]) => {
  const totalData = data.length;
  const totalPNS = data.filter(d => d.golongan === 'PNS').length;
  const totalNonPNS = data.filter(d => d.golongan === 'Non-PNS').length;
  const totalKotor = data.reduce((sum, d) => sum + (d.kotor || 0), 0);
  const totalBersih = data.reduce((sum, d) => sum + (d.bersih || 0), 0);

  return {
    totalData,
    totalPNS,
    totalNonPNS,
    totalKotor,
    totalBersih,
  };
};
