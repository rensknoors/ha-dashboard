import { AnimationClip, PropertyBinding } from 'three';

export const createPartClips = <TPart extends string>(
  clip: AnimationClip,
  partNodes: Record<TPart, string | readonly string[]>
): Record<TPart, AnimationClip> => {
  const entries = Object.entries(partNodes) as [
    TPart,
    string | readonly string[],
  ][];

  return Object.fromEntries(
    entries.map(([part, nodes]) => {
      const nodeNames = new Set(typeof nodes === 'string' ? [nodes] : nodes);
      const tracks = clip.tracks.filter((track) =>
        nodeNames.has(PropertyBinding.parseTrackName(track.name).nodeName)
      );
      return [part, new AnimationClip(part, -1, tracks)];
    })
  ) as Record<TPart, AnimationClip>;
};
