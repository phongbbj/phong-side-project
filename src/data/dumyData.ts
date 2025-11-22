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
    src: "https://salt.tikicdn.com/cache/750x750/ts/product/e7/4c/57/f9badc95a3d118bc0891381160218901.jpg.webp",
    name: "Tai nghe Bluetooth X Pro",
    price: 990_000,       // 990.000₫
    oldPrice: 1_290_000,  // 1.290.000₫
    tag: "HOT",
  },
  {
    id: 2,
    src: "https://bossgear.net/wp-content/uploads/2023/05/20230521_153343.jpg",
    name: "Bàn phím cơ RGB Gaming",
    price: 1_590_000,     // 1.590.000₫
    oldPrice: 1_990_000,  // 1.990.000₫
    tag: "-20%",
  },
  {
    id: 3,
    src: "https://product.hstatic.net/200000755737/product/z6048366686279_258043bb579ab3dfbe984f8a5fef1734_1474b8de750b46ceac673e179ac84c5b_1024x1024.jpg",
    name: "Áo hoodie oversize unisex",
    price: 390_000,       // 390.000₫
    oldPrice: 490_000,    // 490.000₫
    tag: "NEW",
  },
  {
    id: 4,
    src: "https://img.lazcdn.com/g/p/3d9b1a5347f361d1970ba5bfb6101559.jpg_720x720q80.jpg_.webp",
    name: "Giày sneaker thể thao",
    price: 1_290_000,     // 1.290.000₫
    oldPrice: 1_590_000,  // 1.590.000₫
    tag: "-18%",
  },
    {
    id: 5,
    src: "https://truonggiang.vn/wp-content/uploads/2022/12/Chuot-gaming-khong-day-YINDIAO-A5-RGB-Den-1.jpg",
    name: "Chuột gaming RGB không dây",
    price: 590_000, // 590.000₫
    oldPrice: 790_000, // 790.000₫
    tag: "HOT",
  },
  {
    id: 6,
    src: "https://minhhightech.com/images/ckeditor/images2/b866df855dfed96ee0623af388f736a0.jpg",
    name: "Màn hình cong 27\" 2K 144Hz",
    price: 4_990_000, // 4.990.000₫
    oldPrice: 5_990_000, // 5.990.000₫
    tag: "-17%",
  },
  {
    id: 7,
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/e/series_7.png",
    name: "Smartwatch Pro series",
    price: 2_490_000, // 2.490.000₫
    oldPrice: 2_990_000, // 2.990.000₫
    tag: "BEST",
  },
  {
    id: 8,
    src: "https://d28jzcg6y4v9j1.cloudfront.net/media/social/2024/08/16/laptop_mong_nhe_nhat_5_1723749325894.jpg",
    name: "Laptop Ultrabook mỏng nhẹ 14\"",
    price: 18_900_000, // 18.900.000₫
    oldPrice: 21_900_000, // 21.900.000₫
    tag: "-14%",
  },
];
