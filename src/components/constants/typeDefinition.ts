export type Bound = {
    east: number,
    west: number,
    north: number,
    south: number
}

export type MapProps = {
    overlaycompleted?(e: google.maps.drawing.OverlayCompleteEvent): void
}