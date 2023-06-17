// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Khám phá',
    path: '/',
    icon: icon('ic_user'),
  },
  {
    title: 'Bảng xếp hạng',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Chủ đề',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Nhận diện bài hát',
    path: '/recognition',
    icon: icon('ic_lock'),
  }
];

export default navConfig;