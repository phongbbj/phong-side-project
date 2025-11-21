export type HeroSlide = {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  discount?: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "HOT DEAL",
    title: "Bộ sưu tập đồ điện tử 2025",
    subtitle: "Giảm giá đến 40% cho laptop, màn hình, phụ kiện gaming.",
    ctaLabel: "Mua ngay",
    discount: "Giảm 40%",
  },
  {
    id: 2,
    badge: "NEW ARRIVAL",
    title: "Thời trang nam mùa mới",
    subtitle: "Hàng trăm mẫu áo thun, hoodie, quần jean được cập nhật.",
    ctaLabel: "Khám phá",
    discount: "New",
  },
  {
    id: 3,
    badge: "LIMITED",
    title: "Gian hàng Official Brand",
    subtitle: "Sản phẩm chính hãng, bảo hành đầy đủ, ưu đãi độc quyền.",
    ctaLabel: "Xem brand",
    discount: "Chính hãng",
  },
];

export const CATEGORIES = [
  "Điện thoại & Phụ kiện",
  "Laptop & Máy tính",
  "TV & Thiết bị âm thanh",
  "Đồ gia dụng",
  "Thời trang nam",
  "Thời trang nữ",
  "Mẹ & bé",
  "Thể thao & Du lịch",
  "Sức khỏe & Làm đẹp",
  "Siêu thị & Bách hóa",
];

export const PROMO_BANNERS = [
  {
    id: 1,
    label: "Flash Sale",
    title: "Giảm sốc mỗi ngày",
    description: "Thời gian có hạn, số lượng có hạn.",
  },
  {
    id: 2,
    label: "Free Ship",
    title: "Miễn phí vận chuyển",
    description: "Cho đơn từ 499K, áp dụng toàn quốc.",
  },
  {
    id: 3,
    label: "Voucher",
    title: "Mã giảm thêm 10%",
    description: "Áp dụng cho khách hàng mới.",
  },
];

export type FeaturedProduct = {
  id: number;
  src: string;
  name: string;
  price: number;    // VND
  oldPrice?: number;
  tag?: string;
};

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 1,
    src: "public/assets/tainghe.webp",
    name: "Tai nghe Bluetooth X Pro",
    price: 990_000,       // 990.000₫
    oldPrice: 1_290_000,  // 1.290.000₫
    tag: "HOT",
  },
  {
    id: 2,
    src: "public/assets/banphim.jpg",
    name: "Bàn phím cơ RGB Gaming",
    price: 1_590_000,     // 1.590.000₫
    oldPrice: 1_990_000,  // 1.990.000₫
    tag: "-20%",
  },
  {
    id: 3,
    src: "public/assets/ao.webp",
    name: "Áo hoodie oversize unisex",
    price: 390_000,       // 390.000₫
    oldPrice: 490_000,    // 490.000₫
    tag: "NEW",
  },
  {
    id: 4,
    src: "public/assets/giay.webp",
    name: "Giày sneaker thể thao",
    price: 1_290_000,     // 1.290.000₫
    oldPrice: 1_590_000,  // 1.590.000₫
    tag: "-18%",
  },
    {
    id: 5,
    src: "public/assets/chuot.webp",
    name: "Chuột gaming RGB không dây",
    price: 590_000, // 590.000₫
    oldPrice: 790_000, // 790.000₫
    tag: "HOT",
  },
  {
    id: 6,
    src: "public/assets/HKC_NB27C2.jpg",
    name: "Màn hình cong 27\" 2K 144Hz",
    price: 4_990_000, // 4.990.000₫
    oldPrice: 5_990_000, // 5.990.000₫
    tag: "-17%",
  },
  {
    id: 7,
    src: "public/assets/dongho.webp",
    name: "Smartwatch Pro series",
    price: 2_490_000, // 2.490.000₫
    oldPrice: 2_990_000, // 2.990.000₫
    tag: "BEST",
  },
  {
    id: 8,
    src: "public/assets/laptop-14-inch-mong-nhe-4.jpg",
    name: "Laptop Ultrabook mỏng nhẹ 14\"",
    price: 18_900_000, // 18.900.000₫
    oldPrice: 21_900_000, // 21.900.000₫
    tag: "-14%",
  },
];
