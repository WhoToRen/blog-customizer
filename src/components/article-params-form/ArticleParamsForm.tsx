import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	AppState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ AppState }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [OptionState, setOptionState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	function StateChange(key: keyof ArticleStateType) {
		return function (value: OptionType) {
			setOptionState((prevState) => ({ ...prevState, [key]: value }));
		};
	}

	function StateReset() {
		setOptionState(defaultArticleState);
		AppState(defaultArticleState);
	}

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onClose: () => setOpen(false),
		onChange: setOpen,
	});

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => {
						setOpen(!isOpen);
					}}
				/>
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={(evt) => {
							evt.preventDefault();
							AppState(OptionState);
						}}>
						<h2 className={styles.header}>Задайте параметры</h2>
						<Select
							title='Шрифт'
							selected={OptionState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={StateChange('fontFamilyOption')}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='Fonts'
							selected={OptionState.fontSizeOption}
							options={fontSizeOptions}
							onChange={StateChange('fontSizeOption')}
						/>
						<Select
							title='Цвет шрифта'
							selected={OptionState.fontColor}
							options={fontColors}
							onChange={StateChange('fontColor')}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={OptionState.backgroundColor}
							options={backgroundColors}
							onChange={StateChange('backgroundColor')}
						/>
						<Select
							title='Ширина контента'
							selected={OptionState.contentWidth}
							options={contentWidthArr}
							onChange={StateChange('contentWidth')}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={StateReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
