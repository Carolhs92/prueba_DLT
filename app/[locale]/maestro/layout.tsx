import { NavigationMaestro } from '@/components/NavigationMaestro';
import { SidebarImage } from '@/components/SidebarImage'; 
import style from '@/styles/layout.module.scss';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style['layout-page']}>
      <div className={style['layout-page__sidebar']}>
        <SidebarImage src="/assets/master.png"/>  
      </div>
      <div className={style['layout-page__nav']}>
        <NavigationMaestro />
      </div>
      <div className={style['layout-page__children']}>
        {children} 
      </div>
    </div>
  );
}
