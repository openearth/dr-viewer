from geoserver.catalog import Catalog
import json

# Don't check in credentials!
USERNAME = '***********'
PASSWORD = '***********'

# Connect to Dominican Republic Geoserver
cat = Catalog('https://openearth-dominicaanse-republiek.avi.deltares.nl/geoserver/rest/',
              USERNAME, PASSWORD)

files = [{
    'name': 'Amenazas',
    'id': 'Mapas_de_Amenazas',
    'children_names': ['Inundacion_Fluvial', 'Inundacion_Lluvia_Huracanada', 'Terremoto', 'SISMO_RD', 'Tsunami'],
    'children': []
}]

for file in files:
    for layer in cat.get_resources(workspace=file['id']):
        name = layer.name
        print(file['name'], name, layer.title)
        id = '{resource}:{name}'.format(resource=file['id'], name=name)
        # Create empty layer
        new_layer = {}
        new_layer['id'] = id
        new_layer['layer'] = name
        new_layer['url'] = 'https://visualizaciondr.openearth.eu/geoserver/wms'

        child = [child_name for child_name in file['children_names']
                 if(child_name in name)]
        if (len(child) == 0):
            child = False
        else:
            child = child[0]

        grand_child = [grand_child_name for grand_child_name in file['grand_children_names'] if(
            grand_child_name in name)]
        if (len(grand_child) == 0):
            grand_child = False
        else:
            grand_child = grand_child[0]

        if (child):
            # check if already child with this ID
            has_child = next(
                (x for x in file['children'] if x['id'] == child), None)

            title = name.split(child)[-1].split('_')
            title = ' '.join(title)

            new_layer['name'] = title
            if (not has_child):
                file['children'].append({
                    'id': child,
                    'name': title,
                    'children': []
                })
            has_child = next(
                (x for x in file['children'] if x['id'] == child), None)

        if (child and grand_child):
            title = name.split(grand_child)[-1].split('_')
            title = ' '.join(title)
            new_layer['name'] = title

            has_grand_child = next(
                (x for x in has_child['children'] if x['id'] == grand_child), None)
            if (not has_grand_child):
                title = grand_child.split('_')
                title = ' '.join(title)
                has_child['children'].append({
                    'id': grand_child,
                    'name': title,
                    'children': []
                })
                has_grand_child = next(
                    (x for x in has_child['children'] if x['id'] == grand_child), None)
            new_layer['name'] = title
            has_grand_child['children'].append(new_layer)

        if (child and not grand_child):
            title = name.split(child)[-1].split('_')
            title = ' '.join(title)
            new_layer['name'] = title
            file['children'].append(new_layer)
        if (not child and not grand_child):
            title = name.split(':')[-1].split('_')
            title = ' '.join(title)
            new_layer['name'] = file['id']
            file['children'].append(new_layer)

    filename = '../%s.json' % (file['name'])
    with open(filename, 'w') as outfile:
        outfile.write(json.dumps([file], indent=4))
        print("Text file has been created: ", file['name'])
        outfile.close()
