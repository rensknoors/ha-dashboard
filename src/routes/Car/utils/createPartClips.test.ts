import { AnimationClip, QuaternionKeyframeTrack } from 'three';

import { createPartClips } from './createPartClips';

const rotationTrack = (nodeName: string, duration: number) =>
  new QuaternionKeyframeTrack(
    `${nodeName}.quaternion`,
    [0, duration],
    [0, 0, 0, 1, 0, 0.7071, 0, 0.7071]
  );

const clip = new AnimationClip('Take 001', 2, [
  rotationTrack('HOOD', 1.5),
  rotationTrack('LF_DOOR', 2),
  rotationTrack('LF_DOOR_1', 2),
  rotationTrack('Steering_Wheel', 2),
]);

describe('createPartClips', () => {
  it('splits a clip into one clip per part node', () => {
    const clips = createPartClips(clip, { frunk: 'HOOD', door: 'LF_DOOR' });

    expect(clips.frunk.tracks.map((track) => track.name)).toEqual([
      'HOOD.quaternion',
    ]);
    expect(clips.door.tracks.map((track) => track.name)).toEqual([
      'LF_DOOR.quaternion',
    ]);
  });

  it('combines multiple nodes into one clip', () => {
    const clips = createPartClips(clip, {
      steering: ['HOOD', 'Steering_Wheel'],
    });

    expect(clips.steering.tracks.map((track) => track.name)).toEqual([
      'HOOD.quaternion',
      'Steering_Wheel.quaternion',
    ]);
  });

  it('derives the duration from the part tracks', () => {
    const clips = createPartClips(clip, { frunk: 'HOOD' });

    expect(clips.frunk.duration).toBe(1.5);
  });

  it('returns an empty clip for unknown nodes', () => {
    const clips = createPartClips(clip, { missing: 'NOPE' });

    expect(clips.missing.tracks).toHaveLength(0);
  });
});
