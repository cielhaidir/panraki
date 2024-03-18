import React from "react";

export default function Unit() {
    return (
        <section className="py-10 md:py-16"  style={{    }}>
            <div className="container text-slate-700">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                        Terjadi Masalah?
                    </h2>
                    <p className="text-lg sm:text-2xl mb-6 md:mb-14">
                        Berikut penjelasan dari unit unit yang tersedia di
                        Politeknik Negeri Ujung Pandang
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl-gap-10">
                    <div className="card  m-3 glassmor ">
                        <div className="card-body items-center text-center gap-4">
                            <h2 className="card-title text-3xl sm:text-4xl font-bold lg:mt-5 lg:mb-5">
                                UPT TIK
                            </h2>
                            <p className="text-lg sm:text-2xl mb-6 md:mb-14 pt-1">
                                Unit Pelayanan Teknis yang berfokus untuk
                                memberikan layanan dan ketersediaan Jaringan dan
                                Aplikasi
                            </p>
                        </div>
                    </div>

                    <div className="card  m-3 glassmor">
                        <div className="card-body items-center text-center gap-4">
                            <h2 className="card-title text-3xl sm:text-4xl font-bold lg:mt-5 lg:mb-5">
                                UNIT T3PA
                            </h2>
                            <p className="text-lg sm:text-2xl mb-6 md:mb-14  ">
                                Unit Pelayanan Teknis yang melayani pengaduan Peralatan Lab & Bengkel, Kelistrikan, Kendaraan Dinas, Perangkat Komputer/Elektronik, Pompa Air, Air Conditioner (AC)
                            </p>
                        </div>
                    </div>

                    <div className="card   m-3 glassmor mb-3    ">
                        <div className="card-body items-center text-center gap-4">
                            <h2 className="card-title text-3xl sm:text-4xl font-bold">
                                RUMAH TANGGA
                            </h2>
                            <p className="text-lg sm:text-2xl mb-6 md:mb-14 pt-1">
                                Unit Pelayanan yang berfokus untuk
                                memberikan layanan terkait kebutuhan tentang Sumber Daya Manusia
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
