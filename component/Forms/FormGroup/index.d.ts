/**
 * @typedef Group
 * @property {string} id
 * @property {string} value
 * @property {string} error
 * @property {boolean} isChosen
 * @property {boolean} isInvalid
 * @property {boolean=} readOnly
 */
/**
 * FormGroup component
 *
 * @param {object} props - form group props
 * @param {Group} props.group - group state
 * @param {React.Dispatch<React.SetStateAction<Group>>} props.setGroup - group setState
 */
export function FormGroup(props: {
    group: Group;
    setGroup: React.Dispatch<React.SetStateAction<Group>>;
}): JSX.Element;
export type Group = {
    id: string;
    value: string;
    error: string;
    isChosen: boolean;
    isInvalid: boolean;
    readOnly?: boolean | undefined;
};
