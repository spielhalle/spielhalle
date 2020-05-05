/*!
 * Source https://github.com/spielhalle/spielhalle Package: @spielhalle/client
 */

type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };
