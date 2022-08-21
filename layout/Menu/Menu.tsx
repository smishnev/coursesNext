import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link'; 
import { firstLevelMenu } from '../../helpers/helpers';
import { AppContext } from '../../context/app.context';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route} aria-expanded={m.id == firstCategory}>
						<Link href={`/${m.route}`}>
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => (
						<div key={m._id.secondCategory}>
							<div className={styles.secondLevel}>{m._id.secondCategory}</div>
							<div className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: m.isOpened
							})}>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => (
				<Link key={p._id} href={`/${route}/${p.alias}`}>
					<a
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: true
						})}
					>
						{p.category}
					</a>
				</Link>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};