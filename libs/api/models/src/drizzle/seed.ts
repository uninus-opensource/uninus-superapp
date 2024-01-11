import { Pool } from "pg";
import * as schema from ".";
import { drizzle } from "drizzle-orm/node-postgres";

const dbUrl = process.env["DATABASE_URL"] as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

const db = drizzle(dbQueryClient, {
  schema,
});

const seedRegistrationStatus = async () => {
  const registrationStatusExist = await db
    .select({ id: schema.registrationStatus.id })
    .from(schema.registrationStatus);

  if (registrationStatusExist.length) {
    return;
  }
  console.log("Seeding registration status... 🚀");
  await db
    .insert(schema.registrationStatus)
    .values([
      { name: "Belum Mendaftar" },
      { name: "Belum Membayar" },
      { name: "Proses Seleksi" },
      { name: "Seleksi Test" },
      { name: "Lulus Seleksi" },
      { name: "Tidak Lulus" },
    ]);
  console.log("Seeding registration status! 🎊");
};

const seedEducationType = async () => {
  const educationTypeExist = await db
    .select({ id: schema.educationType.id })
    .from(schema.educationType);

  if (educationTypeExist.length) {
    return;
  }
  console.log("Seeding education type... 🚀");
  await db.insert(schema.educationType).values([{ name: "SMA" }, { name: "SMK" }, { name: "MA" }]);
  console.log("Seeding education type! 🎊");
};

const seedEducationMajor = async () => {
  const educationMajorExist = await db
    .select({ id: schema.educationMajor.id })
    .from(schema.educationMajor);

  if (educationMajorExist.length) {
    return;
  }

  const educationType = await db
    .select({ id: schema.educationType.id, name: schema.educationType.name })
    .from(schema.educationType);
  if (!educationType.length) {
    console.log("Failed seeding education type");
    return;
  }

  const smaId = educationType.filter((el) => el.name === "SMA")[0].id;
  const smkId = educationType.filter((el) => el.name === "SMK")[0].id;
  const maId = educationType.filter((el) => el.name === "MA")[0].id;

  console.log("Seeding education major... 🚀");
  await db.insert(schema.educationMajor).values([
    { name: "IPA", educationTypeId: smaId },
    { name: "IPS", educationTypeId: smaId },
    { name: "Bahasa", educationTypeId: smaId },
    { name: "Teknologi dan Rekayasa", educationTypeId: smkId },
    { name: "Energi dan Pertambangan", educationTypeId: smkId },
    { name: "Teknologi Informasi dan Komunikasi", educationTypeId: smkId },
    { name: "Kesehatan dan Pekerjaan Sosial", educationTypeId: smkId },
    { name: "Agribisnis dan Agroteknologi", educationTypeId: smkId },
    { name: "Kemaritiman", educationTypeId: smkId },
    { name: "Bisnis dan Manajemen", educationTypeId: smkId },
    { name: "Pariwisata", educationTypeId: smkId },
    { name: "Seni dan Industri Kreatif", educationTypeId: smkId },
    { name: "Seni dan Industri Kreatif", educationTypeId: smkId },
    { name: "IPA", educationTypeId: maId },
    { name: "IPS", educationTypeId: maId },
    { name: "Bahasa", educationTypeId: maId },
    { name: "Ilmu-Ilmu Keagamaan", educationTypeId: maId },
  ]);
  console.log("Seeding education major! 🎊");
};

const seedParentEducation = async () => {
  const parentEducationExist = await db
    .select({ id: schema.parentEducation.id })
    .from(schema.parentEducation);

  if (parentEducationExist.length) {
    return;
  }
  console.log("Seeding parent education... 🚀");
  await db
    .insert(schema.parentEducation)
    .values([
      { name: "Tidak Bersekolah" },
      { name: "SD" },
      { name: "SMP" },
      { name: "SMA" },
      { name: "D3" },
      { name: "D4/S1" },
      { name: "S2" },
      { name: "S3" },
    ]);
  console.log("Seeding parent education! 🎊");
};

const seedParentStatus = async () => {
  const parentStatusExist = await db
    .select({ id: schema.parentStatus.id })
    .from(schema.parentStatus);

  if (parentStatusExist.length) {
    return;
  }
  console.log("Seeding parent status... 🚀");
  await db
    .insert(schema.parentStatus)
    .values([{ name: "Masih Hidup" }, { name: "Sudah Meninggal" }]);
  console.log("Seeding parent status! 🎊");
};

const seedDegreeProgram = async () => {
  const degreeProgramExist = await db
    .select({ id: schema.degreeProgram.id })
    .from(schema.degreeProgram);
  if (degreeProgramExist.length) {
    return;
  }
  console.log("Seeding degree program... 🚀");
  await db
    .insert(schema.degreeProgram)
    .values([
      { name: "Program Sarjana(S1)" },
      { name: "Program Pascasarjana(S2)" },
      { name: "Program Pascasarjana(S3)" },
    ]);
  console.log("Seeding degree program! 🎊");
};

const seedRegistrationPath = async () => {
  const registrationPathsExist = await db
    .select({ id: schema.registrationPath.id })
    .from(schema.registrationPath);

  if (registrationPathsExist.length) {
    return;
  }

  const degreeProgram = await db
    .select({ id: schema.degreeProgram.id, name: schema.degreeProgram.name })
    .from(schema.degreeProgram);
  if (!degreeProgram.length) {
    console.log("Failed seeding registration path");
    return;
  }

  const s1Id = degreeProgram.filter((el) => el.name.includes("S!"))[0].id;
  const s2Id = degreeProgram.filter((el) => el.name.includes("S2"))[0].id;
  const s3Id = degreeProgram.filter((el) => el.name.includes("S3"))[0].id;

  console.log("Seeding registration path... 🚀");
  await db.insert(schema.registrationPath).values([
    { name: "Mahasiswa Baru", degreeProgramId: s1Id },
    { name: "Mahasiswa Pindahan", degreeProgramId: s1Id },
    { name: "Rekognisi Pembelajaran Lampau (RPL)", degreeProgramId: s1Id },
    { name: "Pascasarjana(S2)", degreeProgramId: s2Id },
    { name: "Pascasarjana(S3)", degreeProgramId: s3Id },
  ]);
  console.log("Seeding registration path! 🎊");
};

const seedMaritalStatus = async () => {
  const maritalStatusExist = await db
    .select({ id: schema.maritalStatus.id })
    .from(schema.maritalStatus);
  if (maritalStatusExist.length) {
    return;
  }
  console.log("Seeding marital status... 🚀");
  await db
    .insert(schema.maritalStatus)
    .values([{ name: "Sudah Menikah" }, { name: "Belum Menikah" }]);
  console.log("Seeding marital status! 🎊");
};

const seedReligion = async () => {
  const religionExist = await db.select({ id: schema.religion.id }).from(schema.religion);
  if (religionExist.length) {
    return;
  }
  console.log("Seeding religion... 🚀");
  await db
    .insert(schema.religion)
    .values([
      { name: "Islam" },
      { name: "Kristen" },
      { name: "Katolik" },
      { name: "Hindu" },
      { name: "Buddha" },
      { name: "Khonghucu" },
    ]);
  console.log("Seeding religion! 🎊");
};

const seedGender = async () => {
  const genderExist = await db.select({ id: schema.gender.id }).from(schema.gender);
  if (genderExist.length) {
    return;
  }
  console.log("Seeding gender... 🚀");
  await db.insert(schema.gender).values([{ name: "Laki-laki" }, { name: "Perempuan" }]);
  console.log("Seeding gender! 🎊");
};

const seedCitizenship = async () => {
  const citizenshipExist = await db.select({ id: schema.citizenship.id }).from(schema.citizenship);
  if (citizenshipExist.length) {
    return;
  }
  console.log("Seeding citizenship... 🚀");
  await db.insert(schema.citizenship).values([{ name: "WNI" }, { name: "WNA" }]);
  console.log("Seeding citizenship! 🎊");
};

const seedDisability = async () => {
  const disabilityExist = await db.select({ id: schema.disabilities.id }).from(schema.disabilities);
  if (disabilityExist.length) {
    return;
  }
  console.log("Seeding disability... 🚀");
  await db.insert(schema.disabilities).values([
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
  ]);
  console.log("Seeding disability! 🎊");
};

const seedSelectionPath = async () => {
  const selectionPathExist = await db
    .select({ id: schema.selectionPath.id })
    .from(schema.selectionPath);

  if (selectionPathExist.length) {
    return;
  }

  const degreeProgram = await db
    .select({ id: schema.degreeProgram.id, name: schema.degreeProgram.name })
    .from(schema.degreeProgram);
  if (!degreeProgram.length) {
    console.log("Failed seeding selection path");
    return;
  }

  const s1Id = degreeProgram.filter((el) => el.name.includes("S!"))[0].id;
  const s2Id = degreeProgram.filter((el) => el.name.includes("S2"))[0].id;
  const s3Id = degreeProgram.filter((el) => el.name.includes("S3"))[0].id;

  console.log("Seeding selection path... 🚀");
  await db.insert(schema.registrationPath).values([
    { name: "Seleksi Prestasi Akademik(SPA)", degreeProgramId: s1Id },
    { name: "Seleksi Prestasi Non Akademik (SPNA)", degreeProgramId: s1Id },
    { name: "Seleksi Test", degreeProgramId: s1Id },
    { name: "Seleksi Pascasarjana(S2)", degreeProgramId: s2Id },
    { name: "Seleksi Pascasarjana(S3)", degreeProgramId: s3Id },
  ]);
  console.log("Seeding selection path! 🎊");
};

const seedScholarship = async () => {
  const scholarshipExist = await db.select({ id: schema.scholarship.id }).from(schema.scholarship);

  if (scholarshipExist.length) {
    return;
  }

  console.log("Seeding scholarship... 🚀");
  await db.insert(schema.scholarship).values([
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
  ]);
  console.log("Seeding scholarship! 🎊");
};

const seedOccupation = async () => {
  const occupationExist = await db.select({ id: schema.occupation.id }).from(schema.occupation);

  if (occupationExist.length) {
    return;
  }

  console.log("Seeding occupation... 🚀");
  await db.insert(schema.occupation).values([
    {
      name: "Tidak Bekerja",
    },
    {
      name: "Ibu Rumah Tangga",
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
  ]);
  console.log("Seeding occupation! 🎊");
};

const seedSalary = async () => {
  const salaryExist = await db.select({ id: schema.salary.id }).from(schema.salary);

  if (salaryExist.length) {
    return;
  }

  console.log("Seeding salary... 🚀");
  await db.insert(schema.salary).values([
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
  ]);
  console.log("Seeding salary! 🎊");
};

const seedFaculty = async () => {
  const facultyhExist = await db.select({ id: schema.faculty.id }).from(schema.faculty);

  if (facultyhExist.length) {
    return;
  }

  const degreeProgram = await db
    .select({ id: schema.degreeProgram.id, name: schema.degreeProgram.name })
    .from(schema.degreeProgram);
  if (!degreeProgram.length) {
    console.log("Failed seeding faculty");
    return;
  }

  const s1Id = degreeProgram.filter((el) => el.name.includes("S!"))[0].id;
  const s2Id = degreeProgram.filter((el) => el.name.includes("S2"))[0].id;
  const s3Id = degreeProgram.filter((el) => el.name.includes("S3"))[0].id;

  console.log("Seeding faculty... 🚀");
  await db.insert(schema.faculty).values([
    {
      name: "Fakultas Agama Islam",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Ekonomi",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Hukum",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Ilmu Komunikasi",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Keguruan dan Ilmu Pendidikan",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Pertanian",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Teknik",
      degreeProgramId: s1Id,
    },
    {
      name: "Fakultas Teknik",
      degreeProgramId: s1Id,
    },
    {
      name: "Sekolah Pascasarjana(S2)",
      degreeProgramId: s2Id,
    },
    {
      name: "Sekolah Pascasarjana(S3)",
      degreeProgramId: s3Id,
    },
  ]);
  console.log("Seeding faculty! 🎊");
};

const seedDepartment = async () => {
  const departmentExist = await db.select({ id: schema.department.id }).from(schema.department);

  if (departmentExist.length) {
    return;
  }

  const [degreeProgram, faculty] = await Promise.all([
    db
      .select({ id: schema.degreeProgram.id, name: schema.degreeProgram.name })
      .from(schema.degreeProgram),
    db.select({ id: schema.faculty.id, name: schema.faculty.name }).from(schema.faculty),
  ]);

  if (!degreeProgram.length || !faculty.length) {
    console.log("Failed seeding department");
    return;
  }

  const s1Id = degreeProgram.filter((el) => el.name.includes("S!"))[0].id;
  const s2Id = degreeProgram.filter((el) => el.name.includes("S2"))[0].id;
  const s3Id = degreeProgram.filter((el) => el.name.includes("S3"))[0].id;

  const fkId = faculty.filter((el) => el.name.includes("Fakultas Ekonomi"))[0].id;
  const fkipId = faculty.filter((el) =>
    el.name.includes("Fakultas Keguruan dan Ilmu Pendidikan"),
  )[0].id;
  const faiId = faculty.filter((el) => el.name.includes("Fakultas Agama Islam"))[0].id;
  const fhId = faculty.filter((el) => el.name.includes("Fakultas Hukum"))[0].id;
  const fikomId = faculty.filter((el) => el.name.includes("Fakultas Ilmu Komunikasi"))[0].id;
  const ftanId = faculty.filter((el) => el.name.includes("Fakultas Pertanian"))[0].id;
  const ftekId = faculty.filter((el) => el.name.includes("Fakultas Teknik"))[0].id;
  const pascaS2Id = faculty.filter((el) => el.name.includes("Sekolah Pascasarjana(S2)"))[0].id;
  const pascaS3Id = faculty.filter((el) => el.name.includes("Sekolah Pascasarjana(S3)"))[0].id;

  console.log("Seeding department... 🚀");
  await db.insert(schema.department).values([
    {
      name: "S1 - Komunikasi dan Penyiaran Islam",
      degreeProgramId: s1Id,
    },
    {
      name: "S1 - Pendidikan Agama Islam",
      degreeProgramId: s1Id,
      facultyId: faiId,
    },
    {
      name: "S1 - Pendidikan Guru Madrasah Ibtidaiyah",
      degreeProgramId: s1Id,
    },
    {
      name: "S1 - Perbankan Syariah",
      degreeProgramId: s1Id,
    },
    {
      name: "S1 - Akuntansi",
      degreeProgramId: s1Id,
      facultyId: fkId,
    },
    {
      name: "S1 - Manajemen",
      degreeProgramId: s1Id,
      facultyId: fkId,
    },
    {
      name: "S1 - Ilmu Hukum",
      degreeProgramId: s1Id,
      facultyId: fhId,
    },
    {
      name: "S1 - Ilmu Komunikasi",
      degreeProgramId: s1Id,
      facultyId: fikomId,
    },
    {
      name: "S1 - Ilmu Perpustakaan",
      degreeProgramId: s1Id,
      facultyId: fikomId,
    },
    {
      name: "S1 - Pendidikan Bahasa Arab",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Bahasa dan Sastra Indonesia",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Bahasa Ingris",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Guru Pendidikan Anak Usia Dini",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Luar Biasa",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Luar Sekolah",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Matematika",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Pendidikan Pancasila dan Kewarganegaraan",
      degreeProgramId: s1Id,
      facultyId: fkipId,
    },
    {
      name: "S1 - Agroteknologi",
      degreeProgramId: s1Id,
      facultyId: ftanId,
    },
    {
      name: "S1 - Teknik Elektro",
      degreeProgramId: s1Id,
      facultyId: ftekId,
    },
    {
      name: "S1 - Teknik Informatika",
      facultyId: ftekId,
      degreeProgramId: s1Id,
    },
    {
      name: "S1 - Teknik Industri",
      facultyId: ftekId,
      degreeProgramId: s1Id,
    },
    {
      name: "S2 - Administrasi Pendidikan",
      degreeProgramId: s2Id,
      facultyId: pascaS2Id,
    },
    {
      name: "S2 - Pendidikan Agama Islam",
      degreeProgramId: s2Id,
      facultyId: pascaS2Id,
    },
    {
      name: "S2 - Ilmu Hukum",
      degreeProgramId: s2Id,
      facultyId: pascaS2Id,
    },
    {
      name: "S3 - Ilmu Pendidikan",
      degreeProgramId: s3Id,
      facultyId: pascaS3Id,
    },
  ]);
};

async function main() {
  try {
    await seedRegistrationStatus();
    await seedEducationType();
    await seedEducationMajor();
    await seedParentEducation();
    await seedParentStatus();
    await seedDegreeProgram();
    await seedRegistrationPath();
    await seedMaritalStatus();
    await seedReligion();
    await seedGender();
    await seedCitizenship();
    await seedDisability();
    await seedSelectionPath();
    await seedScholarship();
    await seedOccupation();
    await seedSalary();
    await seedFaculty();
    await seedDepartment();
  } catch (error) {
    console.error(error);
  }
}

main();
