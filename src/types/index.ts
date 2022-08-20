export type EventProps = {
  end: Date;
  start: Date;
  title: string;
  location: string;
  allDay: boolean;
  isDeleted: boolean;
  isConfirmed: boolean;
  _id: string;
  __v: number;
  id: string;
};
export { };
declare global {
  function someFunction(): string;
  var mongoose: any;
}