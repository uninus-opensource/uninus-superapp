import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.registrationStatus.createMany({
    data: [
      { name: "Belum Mendaftar" },
      { name: "Belum Membayar" },
      { name: "Sudah Membayar" },
      { name: "Proses Seleksi" },
      { name: "Anda Lolos Seleksi" },
      { name: "Anda Tidak Lolos" },
    ],
  });

  await prisma.educationTypes.createMany({
    data: [{ name: "SMA" }, { name: "SMK" }, { name: "MA" }],
  });

  await prisma.educationMajor.createMany({
    data: [
      { name: "IPA", education_type_id: 1 },
      { name: "IPS", education_type_id: 1 },
      { name: "Bahasa", education_type_id: 1 },
      { name: "Teknologi dan Rekayasa", education_type_id: 2 },
      { name: "Energi dan Pertambangan", education_type_id: 2 },
      { name: "Teknologi Informasi dan Komunikasi", education_type_id: 2 },
      { name: "Kesehatan dan Pekerjaan Sosial", education_type_id: 2 },
      { name: "Agribisnis dan Agroteknologi", education_type_id: 2 },
      { name: "Kemaritiman", education_type_id: 2 },
      { name: "Bisnis dan Manajemen", education_type_id: 2 },
      { name: "Pariwisata", education_type_id: 2 },
      { name: "Seni dan Industri Kreatif", education_type_id: 2 },
      { name: "Seni dan Industri Kreatif", education_type_id: 2 },
      { name: "IPA", education_type_id: 3 },
      { name: "IPS", education_type_id: 3 },
      { name: "Bahasa", education_type_id: 3 },
      { name: "Ilmu-Ilmu Keagamaan", education_type_id: 3 },
    ],
  });

  await prisma.parentEducation.createMany({
    data: [
      { name: "Tidak Bersekolah" },
      { name: "SD" },
      { name: "SMP" },
      { name: "SMA" },
      { name: "D3" },
      { name: "D4/S1" },
      { name: "S2" },
      { name: "S3" },
    ],
  });

  await prisma.parentStatus.createMany({
    data: [{ name: "Masih Hidup" }, { name: "Sudah Meninggal" }],
  });

  await prisma.registrationPath.createMany({
    data: [
      { name: "Mahasiswa Baru" },
      { name: "Mahasiswa Pindahan" },
      { name: "Rekognisi Pembelajaran Lampau (RPL)" },
    ],
  });

  await prisma.maritalStatus.createMany({
    data: [{ name: "Sudah Menikah" }, { name: "Belum Menikah" }],
  });

  await prisma.religion.createMany({
    data: [
      { name: "Islam" },
      { name: "Kristen" },
      { name: "Katolik" },
      { name: "Hindu" },
      { name: "Buddha" },
      { name: "Khonghucu" },
    ],
  });

  await prisma.gender.createMany({
    data: [{ name: "Laki-laki" }, { name: "Perempuan" }],
  });

  await prisma.citizenship.createMany({
    data: [{ name: "WNA" }, { name: "WNI" }],
  });

  await prisma.degreeProgram.createMany({
    data: [
      { name: "Program Sarjana(S1)" },
      { name: "Program Sarjana(S2)" },
      { name: "Program Pascasarjana(S3)" },
    ],
  });

  await prisma.disabilities.createMany({
    data: [
      {
        name: "Tuna Daksa",
      },
      {
        name: "Tuna Laras",
      },
      {
        name: "Tuna Netra",
      },
      {
        name: "Tuna Rungu",
      },
    ],
  });

  await prisma.selectionPath.createMany({
    data: [
      {
        name: "Seleksi Prestasi Akademik(SPA)",
      },
      {
        name: "Seleksi Prestasi Non Akademik (SPNA)",
      },
      {
        name: "Seleksi Test",
      },
    ],
  });

  await prisma.scholarship.createMany({
    data: [
      {
        name: "Beasiswa Nusantara Unggul",
      },
      {
        name: "Beasiswa Nusantara Berprestasi",
      },
      {
        name: "Beasiswa Nusantara Peduli Difabel",
      },
      {
        name: "Beasiswa Mitra Nusantara",
      },
    ],
  });

  await prisma.occupation.createMany({
    data: [
      {
        name: "Tidak Bekerja",
      },
      {
        name: "TNI",
      },
      {
        name: "POLRI",
      },
      {
        name: "PNS",
      },
      {
        name: "Buruh",
      },
      {
        name: "Swasta",
      },
      {
        name: "Wirausaha",
      },
      {
        name: "Wiraswasta",
      },
      {
        name: "Petani",
      },
      {
        name: "Guru",
      },
      {
        name: "Dokter",
      },
      {
        name: "Perawat",
      },
      {
        name: "Peternak",
      },
      {
        name: "Nelayan",
      },
    ],
  });

  await prisma.faculty.createMany({
    data: [
      {
        name: "Fakultas Agama Islam",
      },
      {
        name: "Fakultas Ekonomi",
      },
      {
        name: "Fakultas Hukum",
      },
      {
        name: "Fakultas Ilmu Komunikasi",
      },
      {
        name: "Fakultas Keguruan dan Ilmu Pendidikan",
      },
      {
        name: "Fakultas Pertanian",
      },
      {
        name: "Fakultas Teknik",
      },
      {
        name: "Fakultas Teknik",
      },
      {
        name: "Sekolah Pascasarjana",
      },
      {
        name: "Sekolah Pascasarjana",
      },
    ],
  });

  await prisma.department.createMany({
    data: [
      {
        name: "S1 - Komunikasi dan Penyiaran Islam",
      },
      {
        name: "S1 - Pendidikan Agama Islam",
      },
      {
        name: "S1 - Pendidikan Guru Madrasah Ibtidaiyah",
      },
      {
        name: "S1 - Perbankan Syariah",
      },
      {
        name: "S1 - Akuntansi",
      },
      {
        name: "S1 - Manajemen",
      },
      {
        name: "S1 - Ilmu Hukum",
      },
      {
        name: "S1 - Ilmu Komunikasi",
      },
      {
        name: "S1 - Ilmu Perpustakaan",
      },
      {
        name: "S1 - Pendidikan Bahasa Arab",
      },
      {
        name: "S1 - Pendidikan Bahasa dan Sastra Indonesia",
      },
      {
        name: "S1 - Pendidikan Bahasa Ingris",
      },
      {
        name: "S1 - Pendidikan Guru Pendidikan Anak Usia Dini",
      },
      {
        name: "S1 - Pendidikan Luar Biasa",
      },
      {
        name: "S1 - Pendidikan Luar Sekolah",
      },
      {
        name: "S1 - Pendidikan Matematika",
      },
      {
        name: "S1 - Pendidikan Pancasila dan Kewarganegaraan",
      },
      {
        name: "S1 - Agroteknologi",
      },
      {
        name: "S1 - Teknik Elektro",
      },
      {
        name: "S1 - Teknik Informatika",
      },
      {
        name: "S1 - Teknik Industri",
      },
      {
        name: "S2 - Administrasi Pendidikan",
      },
      {
        name: "S2 - Pendidikan Agama Islam",
      },
      {
        name: "S2 - Ilmu Hukum",
      },
      {
        name: "S3 - Ilmu Pendidikan",
      },
    ],
  });

  await prisma.salary.createMany({
    data: [
      {
        name: "Tidak Berpenghasilan",
      },
      {
        name: "<Rp.700.000",
      },
      {
        name: "Rp.700.000-Rp.1.999.000",
      },
      {
        name: "Rp.2.000.000-Rp.4.999.000",
      },
      {
        name: "Rp.5.000.000-Rp.9.999.000",
      },
      {
        name: "Rp.10.000.000-Rp.100.000.000",
      },
    ],
  });

  await prisma.roles.createMany({
    data: [
      { name: "Mahasiswa Baru" },
      { name: "Mahasiswa" },
      { name: "Super Admin PMB" },
      { name: "Admin Seleksi PMB" },
      { name: "Super Admin Keuangan" },
    ],
  });

  await prisma.appsOrigin.createMany({
    data: [
      { name: "akreditasi" },
      { name: "evaluasi" },
      { name: "lms" },
      { name: "siakad" },
      { name: "neo_feeder" },
      { name: "pegawai" },
      { name: "pmb_admin" },
      { name: "pmb_user" },
      { name: "sisfo_akuntansi" },
      { name: "sisfo_aset" },
      { name: "sisfo_bendahara" },
      { name: "sisfo_keuangan" },
      { name: "smart_dashboard" },
      { name: "tata_usaha" },
      { name: "tracer_alumni" },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
