export type Adapter<TSource = unknown, TFinal = unknown> = (
    source: TSource
) => TFinal
