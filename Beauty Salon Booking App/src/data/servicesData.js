const servicesData = [
    {
        category: "Hair | Coloring | Care",
        items: [
            { name: "Saç kəsimi", price: "30 AZN" },
            { name: "Uşaq saç kəsimi", price: "20 AZN" },
            { name: "Klassik dalğalar", price: "40 AZN" },
            { name: "Düz uklatka", price: "25 AZN" },
            { name: "Saç düzümü", price: " 80 AZN" },
            { name: "Dip boyası", price: "70 AZN" },
            { name: "Saç rənglənməsi", price: " 100 AZN" },
            { name: "Ombre - Balyaj", price: "250 AZN" },
            { name: "Blond", price: "300 AZN" },
            { name: "Keratin Botox", price: "200 AZN" },
            { name: "Nano keratin", price: " 250 AZN" },
            { name: "Sadə saç baxımı", price: "40 AZN" },
            { name: "Soyuq botox baxım", price: " 80 AZN" },
            { name: "Caviar", price: "70 AZN" },
            { name: "Botox", price: "80 AZN" },
            { name: "Biozavivka", price: "90 AZN" },
        ],
    },
    {
        category: "Makeup",
        items: [
            { name: "Sade makyaj", price: "50 AZN" },
            { name: "Ziyafet", price: "80 AZN" },
            { name: "Gelin makyaj", price: "150 AZN" },
            { name: "Bride package", price: "300 AZN" },
        ],
    },
    {
        category: "Nail",
        items: [
            { name: "Klassik manikur", price: "15 AZN" },
            { name: "Klassik pedikur", price: "25 AZN" },
            { name: "Manikur şellak", price: "30 AZN" },
            { name: "Pedikür şellak", price: "40 AZN" },
            { name: "Öz dırnağa gel", price: "40 AZN" },
            { name: "Gel ilə qaynaq", price: "50 AZN" },
            { name: "Akril ilə qaynaq", price: "60 AZN" },
            { name: "Dırnağın dizaynı", price: "5 AZN" },

        ],
    },
    {
        category: "Permanent",
        items: [
            { name: "Mikroblading", price: "100 AZN" },
            { name: "Ten-pudra", price: "150 AZN" },
            { name: "Mikroshading", price: "180 AZN" },
            { name: "Liner", price: "130 AZN" },
            { name: "Dodaq permanenti", price: "130 AZN" },

        ],
    },
    {
        category: "Cyprus",
        items: [
            { name: "Klassika", price: "50 AZN" },
            { name: "1.5d", price: "60 AZN" },
            { name: "2d", price: "70 AZN" },
            { name: "3d", price: "80 AZN" },
            { name: "Eyelash laminacia", price: "50 AZN" },
            { name: "Qaş laminasiya", price: "50 AZN" },
            { name: "Removal of eyelashes", price: "10 AZN" },

        ],
    },
    {
        category: "Massage",
        items: [
            { name: "Head threapy", price: "50 AZN" },
            { name: "Relax massage", price: "50 AZN" },
            { name: "Cryo massage", price: "70 AZN" },
            { name: "G8 massage", price: "40 AZN" },
            { name: "Cavitation", price: "40 AZN" },
            { name: "Anti-cellulite massage", price: "40 AZN" },
            { name: "Rf face", price: "30 AZN" },
            { name: "Rf body", price: "20 AZN" },
            { name: "Facial massage", price: "30 AZN" },
            { name: "Therapeutic massage", price: "30 AZN" },



        ],
    },
    {
        category: "Piercing",
        items: [
            { name: "Lobe-Upper-Upper lobe", price: "30 AZN" },
            { name: "Helix-Forward Helix", price: "40AZN" },
            { name: "Tragus-Tragus x2", price: "45 AZN" },
            { name: "Daith", price: "50 AZN" },
            { name: "Brows,Gobek,Dil", price: "70 AZN" },
            { name: "Mikrodermal", price: "100 AZN" },

        ],
    },
    {
        category: "Laser",
        sections: [
            {
                title: "Aleksandrit",
                items: [
                    { name: "Üz", price: "7 AZN" },
                    { name: "Dodaq üstü", price: "3 AZN" },
                    { name: "Qolaltı", price: "5 AZN" },
                    { name: "Ayaqlar", price: "25 AZN" },
                    { name: "Yarı ayaq", price: "15 AZN" },
                    { name: "Qollar", price: "15 AZN" },
                    { name: "Yarı qol", price: "10 AZN" },
                    { name: "Full bədən", price: "35 AZN" },
                ],
            },
            {
                title: "Diod",
                items: [
                    { name: "Standart bədən", price: "30 AZN" },
                    { name: "Full bədən", price: "45 AZN" },
                    { name: "Üz", price: "7 AZN" },
                    { name: "Qol altı", price: "5 AZN" },
                    { name: "Qol", price: "15 AZN" },
                    { name: "Ayaq", price: "15 AZN" },
                    { name: "Kürək", price: "20 AZN" },
                    { name: "Bel", price: "5 AZN" },
                    { name: "Qarın", price: "10 AZN" },
                ],
            },
        ],
    },
    {
        category: "Glamora man",
        sections: [
            {
                title: "Saç xidmətləri",
                items: [
                    { name: "Kəsim", price: "25 AZN" },
                    { name: "Saqqal kəsim", price: "15 AZN" },
                    { name: "Yuyulub ukladka", price: "10 AZN" },
                    { name: "Lipuçka", price: "10 AZN" },
                    { name: "Çistka", price: "30 AZN" },
                    { name: "Qal alması", price: "10 AZN" },
                    { name: "Keratin", price: "80 AZN" },
                    { name: "Bəylik saç düzümü", price: "100 AZN" },
                    { name: "Perma", price: "120 AZN" },
                ],
            },
            {
                title: "Nail Price",
                items: [
                    { name: "Manikur + Pedikur", price: "55 AZN" },
                    { name: "Manikur", price: "15 AZN" },
                    { name: "Sadə pedikur", price: "40 AZN" },
                    { name: "Pedikur (parafin baxım)", price: "50 AZN" },
                    { name: "Dırnaq batması", price: " 60 AZN" },
                ],
            },
        ],
    },
];
export default servicesData