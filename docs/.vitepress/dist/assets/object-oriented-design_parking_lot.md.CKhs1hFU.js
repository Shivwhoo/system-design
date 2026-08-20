import{_ as s,o as n,c as l,a3 as t}from"./chunks/framework.B5WAEDB7.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/parking_lot.md","filePath":"object-oriented-design/parking_lot.md"}'),i={name:"object-oriented-design/parking_lot.md"};function o(p,e,r,_,a,c){return n(),l("div",null,[...e[0]||(e[0]=[t(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design a parking lot\\n\\n## Constraints and assumptions</p><ul><li>What types of vehicles should we support? <ul><li>Motorcycle, Car, Bus</li></ul></li><li>Does each vehicle type take up a different amount of parking spots? <ul><li>Yes</li><li>Motorcycle spot -&gt; Motorcycle</li><li>Compact spot -&gt; Motorcycle, Car</li><li>Large spot -&gt; Motorcycle, Car</li><li>Bus can park if we have 5 consecutive &quot;large&quot; spots</li></ul></li><li>Does the parking lot have multiple levels? <ul><li>Yes\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile parking_lot.py from abc import ABCMeta, abstractmethod</li></ul></li></ul><p>class VehicleSize(Enum):</p><pre><code>MOTORCYCLE = 0
COMPACT = 1
LARGE = 2
</code></pre><p>class Vehicle(metaclass=ABCMeta):</p><pre><code>def __init__(self, vehicle_size, license_plate, spot_size):
    self.vehicle_size = vehicle_size
    self.license_plate = license_plate
    self.spot_size = spot_size
    self.spots_taken = []

def clear_spots(self):
    for spot in self.spots_taken:
        spot.remove_vehicle(self)
    self.spots_taken = []

def take_spot(self, spot):
    self.spots_taken.append(spot)

@abstractmethod
def can_fit_in_spot(self, spot):
    pass
</code></pre><p>class Motorcycle(Vehicle):</p><pre><code>def __init__(self, license_plate):
    super(Motorcycle, self).__init__(VehicleSize.MOTORCYCLE, license_plate, spot_size=1)

def can_fit_in_spot(self, spot):
    return True
</code></pre><p>class Car(Vehicle):</p><pre><code>def __init__(self, license_plate):
    super(Car, self).__init__(VehicleSize.COMPACT, license_plate, spot_size=1)

def can_fit_in_spot(self, spot):
    return True if (spot.size == LARGE or spot.size == COMPACT) else False
</code></pre><p>class Bus(Vehicle):</p><pre><code>def __init__(self, license_plate):
    super(Bus, self).__init__(VehicleSize.LARGE, license_plate, spot_size=5)

def can_fit_in_spot(self, spot):
    return True if spot.size == LARGE else False
</code></pre><p>class ParkingLot(object):</p><pre><code>def __init__(self, num_levels):
    self.num_levels = num_levels
    self.levels = []

def park_vehicle(self, vehicle):
    for level in levels:
        if level.park_vehicle(vehicle):
            return True
    return False
</code></pre><p>class Level(object):</p><pre><code>SPOTS_PER_ROW = 10

def __init__(self, floor, total_spots):
    self.floor = floor
    self.num_spots = total_spots
    self.available_spots = 0
    self.parking_spots = []

def spot_freed(self):
    self.available_spots += 1

def park_vehicle(self, vehicle):
    spot = self._find_available_spot(vehicle)
    if spot is None:
        return None
    else:
        spot.park_vehicle(vehicle)
        return spot

def _find_available_spot(self, vehicle):
    &quot;&quot;&quot;Find an available spot where vehicle can fit, or return None&quot;&quot;&quot;
    # ...

def _park_starting_at_spot(self, spot, vehicle):
    &quot;&quot;&quot;Occupy starting at spot.spot_number to vehicle.spot_size.&quot;&quot;&quot;
    # ...
</code></pre><p>class ParkingSpot(object):</p><pre><code>def __init__(self, level, row, spot_number, spot_size, vehicle_size):
    self.level = level
    self.row = row
    self.spot_number = spot_number
    self.spot_size = spot_size
    self.vehicle_size = vehicle_size
    self.vehicle = None

def is_available(self):
    return True if self.vehicle is None else False

def can_fit_vehicle(self, vehicle):
    if self.vehicle is not None:
        return False
    return vehicle.can_fit_in_spot(self)

def park_vehicle(self, vehicle):  # ...
def remove_vehicle(self):  # ...\\n\`\`\`
</code></pre>`,18)])])}const d=s(i,[["render",o]]);export{u as __pageData,d as default};
