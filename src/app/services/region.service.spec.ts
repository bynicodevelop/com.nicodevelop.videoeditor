import { TestBed } from '@angular/core/testing';

import { Region } from 'wavesurfer.js/src/plugin/regions';

import { OverlapType } from '../enums/overlay-type';
import { RegionService } from './region.service';

describe('RegionService', () => {
  let service: RegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOverlap', () => {
    it('should return an empty array if there are no overlapping regions', () => {
      const region1 = { start: 0, end: 5 } as Region;
      const region2 = { start: 10, end: 15 } as Region;
      const regions = [region2];
      expect(service.getOverlap(region1, regions)).toEqual([]);
    });

    it('should return an array with overlapping regions', () => {
      const region1 = { start: 0, end: 10 } as Region;
      const region2 = { start: 5, end: 15 } as Region;
      const region3 = { start: 20, end: 30 } as Region;
      const regions = [region2, region3];
      expect(service.getOverlap(region1, regions)).toEqual([region2]);
    });

    it('should return an array with multiple overlapping regions', () => {
      const region1 = { start: 0, end: 10 } as Region;
      const region2 = { start: 5, end: 15 } as Region;
      const region3 = { start: 8, end: 12 } as Region;
      const region4 = { start: 20, end: 30 } as Region;
      const regions = [region2, region3, region4];
      expect(service.getOverlap(region1, regions)).toEqual([region2, region3]);
    });
  });

  describe('getOverlayType', () => {
    it('should return OverlapType.NONE if there are no overlapping regions', () => {
      const region = { start: 0, end: 5 } as Region;
      const overlaps = [{ start: 10, end: 15 } as Region];
      expect(service.getOverlayType(region, overlaps)).toEqual(
        OverlapType.NONE
      );
    });

    it('should return OverlapType.START_LEFT if region overlaps on the left side of another region', () => {
      const region = { start: 0, end: 10 } as Region;
      const overlaps = [{ start: 5, end: 15 } as Region];
      expect(service.getOverlayType(region, overlaps)).toEqual(
        OverlapType.START_LEFT
      );
    });

    it('should return OverlapType.START_RIGHT if region overlaps on the right side of another region', () => {
      const region = { start: 5, end: 15 } as Region;
      const overlaps = [{ start: 0, end: 10 } as Region];
      expect(service.getOverlayType(region, overlaps)).toEqual(
        OverlapType.START_RIGHT
      );
    });

    it('should return OverlapType.ENCLOSES if region completely encloses another region', () => {
      const region = { start: 0, end: 15 } as Region;
      const overlaps = [{ start: 5, end: 10 } as Region];
      expect(service.getOverlayType(region, overlaps)).toEqual(
        OverlapType.ENCLOSES
      );
    });
  });
});
