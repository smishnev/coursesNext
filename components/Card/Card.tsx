import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

const Card = ({ color = 'white', children, className, ...props }: CardProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
	return (
		<div ref={ref} className={cn(styles.card, className, {
			[styles.blue]: color == 'blue'
		})} {...props}
		>
			{children}
		</div>
	);
};

export const Textarea = forwardRef(Card);