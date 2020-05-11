import osmnx

omsk = {'city': 'Omsk', 'country': 'Russia'}

F = osmnx.footprints.footprints_from_place(omsk, footprint_type='building')
F.to_csv('out.csv')
