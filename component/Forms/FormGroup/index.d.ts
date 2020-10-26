export type Group = {
    id: string;
    value: string;
    error: string;
    isChosen: boolean;
    isInvalid: boolean;
    readOnly?: boolean | undefined;
};
export type Props = {
    key: number | string;
    group: Group;
    setGroup: React.Dispatch<React.SetStateAction<Group>>;
};
declare function FormGroup(props: Props): JSX.Element;
export default FormGroup;
